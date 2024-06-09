import express from "express";
import { OAuth2Client } from "google-auth-library";
import cors from "cors";

const app = express();
const port = 3000;
const CLIENT_ID = process.env.VITE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

// Enable cors
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Handle POST request to login endpoint
app.post("/login", async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (payload) {
      const { given_name, email, picture } = payload;
      res.status(200).json({ given_name, email, picture });
    } else {
      res.status(400).json({ error: "Invalid payload" });
    }
  } catch (error) {
    res.status(400).json({ error: "Credential verification failed" });
  }
});

app.listen(port, () => {
  console.log(`Hello! I am listening on port ${port}`);
});
