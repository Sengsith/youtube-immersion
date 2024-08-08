import { Router } from "express";
import { getSubtitles } from "youtube-caption-extractor";

const router = Router();

// Handle POST request to transcript endpoint
router.post("/transcript", async (req, res) => {
  console.log("Received request to /transcript");
  const videoId = req.body.videoId;

  if (!videoId) {
    return res.status(400).json({ error: "Video ID is required" });
  }

  try {
    console.log("videoId received:", videoId);
    const result = await getSubtitles({ videoID: videoId, lang: "ja" });
    console.log("transcript backend results:", result);

    if (result.length === 0) {
      return res.status(404).json({ error: "Transcript not available" });
    }

    res.json({ result });
  } catch (error) {
    console.error("Transcript not available:", error);
    res.status(500).json({ error: "Transcript not available:" });
  }
});

export default router;
