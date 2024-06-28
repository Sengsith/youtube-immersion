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
    <div className="transcript-container">
      <h3>Transcript</h3>
      {loading && <div>Loading...</div>}
      {error && <div>So sorry, unable to get transcript!</div>}
      {transcript && (
        <div>
          {transcript.map((line, index) => (
            <p key={index} onClick={() => handleLineClick(line.offset)}>
              {line.timestamp}
              <span>{line.text}</span>
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transcript;
