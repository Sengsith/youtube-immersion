import { useEffect } from "react";
import useFetchVideos from "../hooks/useFetchVideos";
import Thumbnail from "./Thumbnail";
import Paginate from "./Paginate";
import usePaginate from "../hooks/usePaginate";

const Trending = () => {
  const { trendingResults, loading, error, getVideos } = useFetchVideos();

  const { currentItems, pageCount, handlePageClick } = usePaginate({
    items: trendingResults,
    itemsPerPage: 5,
  });

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <h2>Trending Videos</h2>
      {loading && <div>Loading Trending...</div>}
      {error && <div>{error}|</div>}
      <div className="trending-video-list">
        {currentItems?.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
      <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
    </>
  );
};

export default Trending;
