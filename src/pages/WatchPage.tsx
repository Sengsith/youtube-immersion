import { useParams, useLocation, useOutletContext } from "react-router-dom";
import Transcript from "../components/Transcript";
import { UserProps } from "../types/userProps";

const WatchPage = () => {
  const { videoId } = useParams();
  const location = useLocation();
  const video = location.state?.video;

  if (!video) {
    return <div>No video data available</div>;
  }

  const { channelTitle, viewCount, duration, publishedAt } = video;

  const context = useOutletContext<UserProps | null>();
  const user = context?.user ?? null;
  const setUser = context?.setUser ?? (() => {});

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
        <Transcript user={user} setUser={setUser} />
      </div>
    </>
  );
};

export default WatchPage;