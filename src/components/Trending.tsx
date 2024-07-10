import { useEffect, useState } from "react";
import useFetchVideos from "../hooks/useFetchVideos";
import Thumbnail from "./Thumbnail";
import ReactPaginate from "react-paginate";
import { Video } from "../types/video";

const Trending = () => {
  const { trendingResults, loading, error, getVideos } = useFetchVideos();

  const [currentItems, setCurrentItems] = useState<Video[] | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(trendingResults.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(trendingResults.length / itemsPerPage));
  }, [itemOffset, trendingResults]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % trendingResults.length;
    setItemOffset(newOffset);
  };

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
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
};

export default Trending;
