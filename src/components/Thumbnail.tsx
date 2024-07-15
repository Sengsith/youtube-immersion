import { Video } from "../types/video";
import { Link } from "react-router-dom";

const Thumbnail = ({ video }: { video: Video }) => {
  return (
    <div className="trending-video-thumbnail">
      <Link to={`/watch?v=${video.id}`} state={{ video }}>
        <img src={video.thumbnail.url} alt={video.title} />
      </Link>
      <img src={video.channelThumbnail.url} alt={video.channelThumbnail.url} />
      <h3 className="video-title">{video.title}</h3>
      <p className="video-channel">{video.channelTitle}</p>
      <p className="video-views">{video.viewCount}</p>
      <p className="video-duration">{video.duration}</p>
      <p className="video-published">{video.publishedAt}</p>
    </div>
  );
};

export default Thumbnail;
