import { useState, useEffect } from "react";
import { Transcript } from "../types/transcript";
import axios from "axios";

const useFetchTranscript = (videoId: string | undefined) => {
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const scrapeTranscript = async () => {
      try {
        const res = await axios.post("http://localhost:3000/api/transcript", {
          videoId,
        });
        console.log("Data from backend received-Transcript:", res.data.result);
        setTranscript(res.data.result);
        setLoading(false);
      } catch (error) {
        console.log("Error sending videoId to backend:", error);
        setError("Error sending videoId to backend");
      }
    };

    scrapeTranscript();
  }, [videoId]);

  return { transcript, loading, error };
};

export default useFetchTranscript;
