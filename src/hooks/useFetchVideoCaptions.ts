import { useState } from "react";
import { Caption } from "../types/caption";

const BASE_CAPTIONS_URL = "https://youtube.googleapis.com/youtube/v3/captions?";

const useFetchVideoCaptions = () => {
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
};

export default useFetchVideoCaptions;
