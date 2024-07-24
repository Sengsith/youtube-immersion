import { useEffect } from "react";
import useFetchVideos from "../hooks/useFetchVideos";
import Thumbnail from "../components/Thumbnail";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const HomePage = () => {
  const { trendingResults, setTrendingResults, loading, error, getVideos } = useFetchVideos();

  useEffect(() => {
    getVideos();
  }, []);

  useInfiniteScroll(trendingResults, setTrendingResults);

  return (
    <>
      {loading && <div>Loading Trending...</div>}
      {error && <div>{error}|</div>}
      <div className="trending-video-list">
        {trendingResults?.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
