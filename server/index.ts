import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import auth from "./routes/auth";
import transcript from "./routes/transcript";
import favorite from "./routes/favorite";

dotenv.config({ path: "../.env" });

const app = express();
const port = process.env.PORT || 3001;

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

// Routes
app.use("/api", auth);
app.use("/api", transcript);
app.use("/api", favorite);

// app.listen(port, () => {
//   console.log(`Hello! I am listening on port ${port}`);
// });
