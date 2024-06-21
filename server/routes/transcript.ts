import { Router } from "express";
import { YoutubeTranscript } from "youtube-transcript";

const router = Router();

// Handle POST request to transcript endpoint
router.post("/transcript", async (req, res) => {
  console.log("Received request to /transcript");
  const videoId = req.body.videoId;

  if (!videoId) {
    return res.status(400).json({ error: "Video ID is required" });
  }

  console.log("videoId received:", videoId);
  try {
    const result = await YoutubeTranscript.fetchTranscript(videoId);
    res.json({ result });
  } catch (error) {
    console.error("Transcript not available:", error);
    res.status(400).json({ error: "Transcript not available:" });
  }
});

export default router;
