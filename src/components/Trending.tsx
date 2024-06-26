import { useEffect } from "react";
import useFetchVideos from "../hooks/useFetchVideos";
import Thumbnail from "./Thumbnail";

const Trending = () => {
  const { trendingResults, loading, error, getVideos } = useFetchVideos();

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <h2>Trending Videos</h2>
      {loading && <div>Loading Trending...</div>}
      {error && <div>{error}|</div>}
      <div className="trending-video-list">
        {trendingResults.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};

export default Trending;
