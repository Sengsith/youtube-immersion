import { useState, useEffect } from "react";
import { Transcript } from "../types/transcript";
import axios from "axios";

const useFetchTranscript = (videoId: string | undefined) => {
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formatTimestamp = (offset: number): string => {
      const hours = Math.floor(offset / 3600);
      const minutes = Math.floor((offset % 3600) / 60);
      const seconds = Math.floor(offset % 60);

      const paddedHours = hours.toString().padStart(2, "0");
      const paddedMinutes = minutes.toString().padStart(2, "0");
      const paddedSeconds = seconds.toString().padStart(2, "0");

      // Only want hours to show up if there is an hour
      if (hours > 0) {
        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
      }

      return `${paddedMinutes}:${paddedSeconds}`;
    };

    const scrapeTranscript = async () => {
      try {
        setLoading(true);
        const res = await axios.post("http://localhost:3000/api/transcript", {
          videoId,
        });
        const transcript = res.data.result.map((line: any) => ({
          text: line.text,
          duration: line.dur,
          offset: line.start,
          timestamp: formatTimestamp(line.start),
        }));
        setTranscript(transcript);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Error sending videoId to backend");
      }
    };

    scrapeTranscript();
  }, [videoId]);

  return { transcript, loading, error };
};

export default useFetchTranscript;
