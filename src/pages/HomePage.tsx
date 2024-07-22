import { useEffect } from "react";
import useFetchVideos from "../hooks/useFetchVideos";
import Thumbnail from "../components/Thumbnail";
// import Paginate from "../components/Paginate";
// import usePaginate from "../hooks/usePaginate";

const HomePage = () => {
  const { trendingResults, loading, error, getVideos } = useFetchVideos();

  // const { currentItems, pageCount, handlePageClick } = usePaginate({
  //   items: trendingResults,
  //   itemsPerPage: 5,
  // });

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      {loading && <div>Loading Trending...</div>}
      {error && <div>{error}|</div>}
      <div className="trending-video-list">
        {trendingResults?.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
      {/* <Paginate pageCount={pageCount} handlePageClick={handlePageClick} /> */}
    </>
  );
};

export default HomePage;
