import { Router } from "express";
import UserModel from "../../src/models/UserModel";

const router = Router();

// Handle POST request to favorite endpoint
router.post("/favorite", async (req, res) => {
  console.log("Received request to /favorite");
  const videoId = req.body.videoId;
  const email = req.body.email;

  if (!videoId) {
    return res.status(400).json({ error: "Video ID is required" });
  }

  try {
    console.log("videoId received:", videoId);

    const result = await UserModel.findOneAndUpdate(
      { email }, // Query
      { $addToSet: { favorites: videoId } }, // Update
      { new: true, upsert: true } // Options
    );

    res.json({ result });
  } catch (error) {
    console.error("Error favoriting video from backend:", error);
    res.status(500).json({ error: "Could not favorite video" });
  }
});

export default router;
