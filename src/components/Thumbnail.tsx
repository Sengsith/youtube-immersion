import { Video } from "../types/video";
import { Link } from "react-router-dom";

const Thumbnail = ({ video }: { video: Video }) => {
  const smallVideoDetails = "text-sm text-gray-300";

  return (
    <div className="trending-video-thumbnail flex flex-col gap-4 mb-8">
      <Link className="relative" to={`/watch?v=${video.id}`} state={{ video }}>
        <img className="w-full" src={video.thumbnail?.url} alt={video.title} />
        <p className="video-duration text-sm absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded-md">
          {video.duration}
        </p>
      </Link>
      <div className="video-details flex flex-col gap-1 px-4">
        <h3 className="video-title font-bold text-lg">{video.title}</h3>
        <p className={`video-views ${smallVideoDetails}`}>{video.viewCount}</p>
        <p className={`video-published ${smallVideoDetails}`}>{video.publishedAt}</p>
        <div className="thumbnail-channel flex gap-2 items-center">
          <img
            className="rounded-full w-10 self-center"
            src={video.channelThumbnail.url}
            alt={video.channelTitle}
          />
          <p className={`video-channel ${smallVideoDetails}`}>{video.channelTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default Thumbnail;
