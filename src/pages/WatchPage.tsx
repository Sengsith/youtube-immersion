import { useParams } from "react-router-dom";

const WatchPage = () => {
  const { videoId } = useParams();

  return (
    <>
      <iframe
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      ></iframe>
    </>
  );
};

export default WatchPage;
