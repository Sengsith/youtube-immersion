import useFetchTrendingVideos from "../hooks/useFetchTrendingVideos";
import { Link } from "react-router-dom";

const Trending = () => {
  const { trendingVideos, loading, error } = useFetchTrendingVideos();

  return (
    <>
      <h2>Trending Videos</h2>
      {loading && <div>Loading...</div>}
      {error && <div>Error!</div>}
      <div className="trending-video-list">
        {trendingVideos.map((video) => (
          <div key={video.id} className="trending-video-thumbnail">
            <Link to={`/watch/${video.id}`} state={{ video }}>
              <img src={video.thumbnail.url} alt={video.title} />
            </Link>
            <h3 className="video-title">{video.title}</h3>
            <p className="video-channel">{video.channelTitle}</p>
            <p className="video-views">{video.viewCount}</p>
            <p className="video-duration">{video.duration}</p>
            <p className="video-published">{video.publishedAt}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Trending;