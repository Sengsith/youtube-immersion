import { Video } from "../types/video";
import { Link } from "react-router-dom";

const Thumbnail = ({ video }: { video: Video }) => {
  return (
    <div className="trending-video-thumbnail flex flex-col gap-2 mb-4">
      <Link className="relative" to={`/watch?v=${video.id}`} state={{ video }}>
        <img className="w-full rounded-md" src={video.thumbnail?.url} alt={video.title} />
        <p className="video-duration absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded-md">
          {video.duration}
        </p>
      </Link>
      <div className="thumbnail-channel flex gap-2 items-center">
        <img
          className="rounded-full w-10 self-center"
          src={video.channelThumbnail.url}
          alt={video.channelTitle}
        />
        <p className="video-channel text-sm">{video.channelTitle}</p>
      </div>
      <h3 className="video-title">{video.title}</h3>
      <p className="video-views">{video.viewCount}</p>
      <p className="video-published">{video.publishedAt}</p>
    </div>
  );
};

export default Thumbnail;
