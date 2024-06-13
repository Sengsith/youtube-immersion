import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth";
import captions from "./routes/captions";

dotenv.config({ path: "../.env" });

const app = express();
const port = 3000;

// Connect to MongoDB
const MONGO_URI = process.env.VITE_MONGO_URI;

if (!MONGO_URI) {
  console.error("CLIENT_ID is not defined in the environment variables.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => console.error(error));

// Enable cors
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Authentication route for google login
app.use("/api", auth);

// Captions route using user access token
app.use("/api", captions);

app.listen(port, () => {
  console.log(`Hello! I am listening on port ${port}`);
});
