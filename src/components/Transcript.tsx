import useFetchTranscript from "../hooks/useFetchTranscript";

const Transcript = ({ videoId }: { videoId: string | undefined }) => {
  const { transcript, loading, error } = useFetchTranscript(videoId);

  return (
    <div className="transcript-container">
      <h3>Transcript</h3>
      {loading && <div>Loading...</div>}
      {error && <div>So sorry, unable to get transcript!</div>}
      {transcript && (
        <div>
          {transcript.map((line, index) => (
            <div key={index}>
              <p>
                {line.offset}
                <span>{line.text}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transcript;
