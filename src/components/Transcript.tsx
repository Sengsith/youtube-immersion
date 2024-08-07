import { useEffect } from "react";
import { YouTubePlayer } from "react-youtube";
import useFetchTranscript from "../hooks/useFetchTranscript";
import { IoCloseCircleSharp } from "react-icons/io5";

const Transcript = ({
  videoId,
  player,
  currentTime,
  showTranscript,
  setShowTranscript,
  setShowDetails,
}: {
  videoId: string | undefined;
  player: YouTubePlayer | null;
  currentTime: number;
  showTranscript: boolean;
  setShowTranscript: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDetails: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { transcript, loading, error } = useFetchTranscript(videoId);

  // Styling
  const toggleOff = "-translate-x-[100%]";
  const toggleOn = "translate-x-0";

  const handleLineClick = (offset: number) => {
    if (player) player.seekTo(offset, true);
  };

  const highlightTranscriptLine = () => {
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
        const elementRect = element?.getBoundingClientRect();
        const linesContainer = document.getElementById("lines");
        const containerRect = linesContainer?.getBoundingClientRect();
        if (!elementRect) return;
        if (!containerRect) return;
        if (!linesContainer) return;
        const offset = elementRect.top - containerRect.top - linesContainer.clientHeight / 8;

        linesContainer.scrollBy({ top: offset, behavior: "smooth" });
        element?.classList.add("text-blue-500");
        break;
      }
    }
  };

  useEffect(() => {
    highlightTranscriptLine();
  }, [currentTime]);

  return (
    <div
      id="transcript-container"
      className={`border-double border-4 flex-grow border-blue-300 bg-zinc-900 p-4 relative overflow-y-hidden transition-transform duration-300 ease-in-out ${
        showTranscript ? toggleOn : toggleOff
      }`}
    >
      <div className="heading flex justify-between items-center mb-2">
        <h3>Transcript</h3>
        <button
          onClick={() => {
            setShowTranscript(false);
            setTimeout(() => {
              setShowDetails(true);
              // Duration is roughly duration of transition-transform
            }, 200);
          }}
        >
          <IoCloseCircleSharp />
        </button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>So sorry, unable to get transcript!</div>}
      {transcript && (
        <div id="lines" className="flex flex-col gap-2 overflow-y-scroll h-full">
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
