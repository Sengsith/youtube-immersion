import { useParams, useLocation } from "react-router-dom";
import Transcript from "../components/Transcript";

const WatchPage = () => {
  const { videoId } = useParams();
  const location = useLocation();
  const video = location.state?.video;

  if (!video) {
    return <div>No video data available</div>;
  }

  const { channelTitle, viewCount, duration, publishedAt } = video;

  return (
    <>
      <h2>{video.title}</h2>
      <iframe
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      ></iframe>
      <div className="video-details">
        <h3>{channelTitle}</h3>
        <p>{viewCount}</p>
        <p>{duration}</p>
        <p>{publishedAt}</p>
      </div>
      <div className="video-transcript">
        <Transcript />
      </div>
    </>
  );
};

export default WatchPage;
