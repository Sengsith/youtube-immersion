import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import UserModel from "../../src/models/UserModel";

dotenv.config({ path: "../.env" });

const router = Router();
const CLIENT_ID = process.env.VITE_CLIENT_ID;

if (!CLIENT_ID) {
  console.error("CLIENT_ID is not defined in the environment variables.");
  process.exit(1);
}

const client = new OAuth2Client(CLIENT_ID, process.env.VITE_CLIENT_SECRET, "postmessage");

// Handle POST request to login endpoint
router.post("/login", async (req, res) => {
  console.log("Received request to /login");
  const { tokens } = await client.getToken(req.body.code);
  if (!tokens) {
    console.error("Tokens are missing in the request body.");
    res.status(400).json({ error: "Tokens are required" });
  }

  // access_token (to talk with google APIs)
  // refresh_token (to refresh user's token)
  // id_token (JWT contains all user's info)

  // Get user information (name, email, picture, etc)
  try {
    // Used to get payload (user data)
    const idToken = tokens.id_token;
    // Used to keep user logged in
    const refreshToken = tokens.refresh_token;

    if (!idToken) {
      console.error("ID token is missing in the tokens.");
      res.status(400).json({ error: "ID token is missing in the tokens" });
      return;
    }

    if (!refreshToken) {
      console.error("Refresh token is missing in the tokens.");
      res.status(400).json({ error: "Refresh token is missing in the tokens." });
      return;
    }

    const ticket = await client.verifyIdToken({
      idToken: idToken, // Exchanged from the auth-code sent from Login.tsx
      audience: CLIENT_ID, // clientId from google developer console
    });
    const payload = ticket.getPayload();

    if (payload) {
      const { given_name, email, picture } = payload;

      // Find/add user in mongoDB
      const user = await UserModel.findOneAndUpdate(
        { email }, // Query
        { given_name, email, picture, refreshToken }, // Update
        { upsert: true, new: true } // Options
      );

      res.status(200).json({ given_name, email, picture, favorites: user.favorites });
    } else {
      console.log("Invalid Payload");
      res.status(400).json({ error: "Invalid payload" });
    }
  } catch (error) {
    console.log("Credential verification failed:", error);
    res.status(400).json({ error: "Credential verification failed" });
  }
});
// More information on google authentication:
// https://github.com/MomenSherif/react-oauth/issues/12#issuecomment-1131408898

export default router;
