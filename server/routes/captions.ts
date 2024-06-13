import { Router } from "express";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const router = Router();

// Handle POST request to login endpoint
router.post("/captions", async (req, res) => {});

export default router;
