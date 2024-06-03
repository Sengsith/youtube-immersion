import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const WatchPage = () => {
  const { videoId } = useParams();

  return (
    <>
      <h2>WatchPage</h2>
      <Link to="/">Home</Link>
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
