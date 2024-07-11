import ReactPaginate from "react-paginate";

interface PaginateProps {
  pageCount: number;
  handlePageClick: (event: { selected: number }) => void;
}

const Paginate = ({ pageCount, handlePageClick }: PaginateProps) => {
  return (
    <>
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

export default Paginate;
