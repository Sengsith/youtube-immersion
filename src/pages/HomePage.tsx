import { useEffect } from "react";
import useFetchVideos from "../hooks/useFetchVideos";
import Thumbnail from "../components/Thumbnail";
import ThumbnailSkeleton from "../components/ThumbnailSkeleton";
import useInfiniteScroll from "../hooks/useInfiniteScroll";

const HomePage = () => {
  const { trendingResults, setTrendingResults, loading, error, getVideos } = useFetchVideos();

  useEffect(() => {
    getVideos();
  }, []);

  useInfiniteScroll(trendingResults, setTrendingResults);

  return (
    <>
      {error && <div>{error}</div>}
      <div id="trending-video-list" className="grid gap-x-4 grid-cols-auto-fit-20rem md:p-4">
        {loading ? (
          <ThumbnailSkeleton cards={15} />
        ) : (
          trendingResults?.map((video) => <Thumbnail key={video.id} video={video} />)
        )}
      </div>
    </>
  );
};

export default HomePage;
