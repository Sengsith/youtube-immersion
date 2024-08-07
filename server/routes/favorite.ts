import { Router } from "express";
import UserModel from "../models/UserModel";

const router = Router();

// Handle POST request to favorite endpoint
router.post("/favorite", async (req, res) => {
  console.log("Received request to /favorite");
  const videoId = req.body.videoId;
  const email = req.body.email;
  const action = req.body.isFavorite ? "remove" : "add";

  if (!videoId) {
    return res.status(400).json({ error: "Video ID is required" });
  }
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    console.log("videoId received in /favorite:", videoId);
    console.log(`action:`, action);

    let update;
    if (action === "add") {
      update = { $addToSet: { favorites: videoId } };
    } else if (action === "remove") {
      update = { $pull: { favorites: videoId } };
    }
    const result = await UserModel.findOneAndUpdate(
      { email }, // Query
      update, // Update
      { new: true, upsert: true } // Options
    );

    if (!result) return res.status(500).json({ error: "Could not favorite video" });
    res.json(result.favorites);
  } catch (error) {
    console.error("Error favoriting video from backend:", error);
    res.status(500).json({ error: "Could not favorite video" });
  }
});

export default router;
