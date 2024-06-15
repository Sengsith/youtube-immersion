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
    YoutubeTranscript.fetchTranscript(videoId).then((result) => {
      res.json({ result });
    });
  } catch (error) {
    console.log("Credential verification failed:", error);
    res.status(400).json({ error: "Credential verification failed" });
  }
});

export default router;
