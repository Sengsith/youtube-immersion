import { useState, useEffect } from "react";
import { Transcript } from "../types/transcript.ts";
import dummyTranscript from "../data/dummyTranscript.ts";

const useGetTranscript = (videoId: string | undefined) => {
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTranscript(dummyTranscript);
    setLoading(false);
  }, [videoId]);

  return { transcript, loading };
};

export default useGetTranscript;
