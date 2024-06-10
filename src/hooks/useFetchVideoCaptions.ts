import { useState } from "react";
import { Caption } from "../types/caption";

const BASE_CAPTIONS_URL = "https://youtube.googleapis.com/youtube/v3/captions?";

const useFetchVideoCaptions = () => {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Ensure that a user is logged in
  // Make a call using videoId and captions.list to find the caption id
  // captions.list only needs our API key

  // Test Data:
  //// This example has auto-generated captions
  //// videoId: dSUPWVbIFr0
  //// captionId: AUieDabdYrRg1AUf0F30CYV6V_XW0BHojkP9hctfza7QLt4b9sk
  //// This example has auto-generated and manual captions

  //// videoid: h9XdkGyYeaA
  //// captionId: AUieDaY4KECSpXRc8B5QLDENWvZRaQZtclGMJ2z4j8PM70ZYVBI
  //// captionId: AUieDaYXOw0YIlIQEL-KkauoI6I4TW6kKrcqZtRlxPhO

  // With the captionId, we use captions.download to get the actual captions
  // Question: Does this have to be in our backend?
  // captions.download needs Google OAuth 2.0
};

export default useFetchVideoCaptions;
