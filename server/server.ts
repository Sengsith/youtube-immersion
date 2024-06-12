import express from "express";
import cors from "cors";
import auth from "./routes/auth";

const app = express();
const port = 3000;

// Enable cors
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Authentication route for google login
app.use("/api", auth);

app.listen(port, () => {
  console.log(`Hello! I am listening on port ${port}`);
});
