import { YouTubePlayer } from "react-youtube";
import useFetchTranscript from "../hooks/useFetchTranscript";

const Transcript = ({
  videoId,
  player,
}: {
  videoId: string | undefined;
  player: YouTubePlayer | null;
}) => {
  const { transcript, loading, error } = useFetchTranscript(videoId);

  const handleLineClick = (offset: number) => {
    if (player) {
      console.log("offset:", offset);
      player.seekTo(offset, true);
    }
  };

  return (
    <div className="transcript-container border-double border-4 border-blue-300 p-4 overflow-y-scroll flex-grow">
      <h3 className="mb-2">Transcript</h3>
      {loading && <div>Loading...</div>}
      {error && <div>So sorry, unable to get transcript!</div>}
      {transcript && (
        <div className="flex flex-col gap-2">
          {transcript.map((line, index) => (
            <div key={index} onClick={() => handleLineClick(line.offset)}>
              <p className="text-lg">
                {line.timestamp} {line.text}
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
