import { useEffect } from "react";
import { YouTubePlayer } from "react-youtube";
import useFetchTranscript from "../hooks/useFetchTranscript";

const Transcript = ({
  videoId,
  player,
  currentTime,
}: {
  videoId: string | undefined;
  player: YouTubePlayer | null;
  currentTime: number;
}) => {
  const { transcript, loading, error } = useFetchTranscript(videoId);

  const handleLineClick = (offset: number) => {
    if (player) {
      console.log("offset:", offset);
      player.seekTo(offset, true);
    }
  };

  useEffect(() => {
    if (!transcript) return;

    // Loop through all the transcript lines and reset their styling
    for (let i = 0; i < transcript.length; i++) {
      const element = document.getElementById(`line-${i}`);
      element?.classList.remove("text-blue-500");
    }

    // Find the exact line to highlight
    for (let i = 0; i < transcript.length; i++) {
      if (currentTime < transcript[i].offset) {
        // Highlight the previous line (the most recent line that currentTime passed)
        const element = document.getElementById(`line-${i - 1}`);
        element?.scrollIntoView();
        element?.classList.add("text-blue-500");
        break;
      }
    }
  }, [currentTime]);

  return (
    <div className="transcript-container border-double border-4 border-blue-300 p-4 overflow-y-scroll flex-grow scroll-smooth">
      <h3 className="mb-2">Transcript</h3>
      {loading && <div>Loading...</div>}
      {error && <div>So sorry, unable to get transcript!</div>}
      {transcript && (
        <div className="flex flex-col gap-2">
          {transcript.map((line, index) => (
            <div
              id={`line-${index}`}
              className="scroll-mt-16 cursor-pointer"
              key={index}
              onClick={() => handleLineClick(line.offset)}
            >
              <p className="text-lg">
                <span className="text-gray-400 mr-2">{line.timestamp}</span> {line.text}
              </p>
              <hr></hr>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transcript;
