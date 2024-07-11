import { useState, useEffect } from "react";
import { Video } from "../types/video";

interface UsePaginateProps {
  items: Video[];
  itemsPerPage: number;
}

const usePaginate = ({ items, itemsPerPage }: UsePaginateProps) => {
  const [currentItems, setCurrentItems] = useState<Video[] | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, items]);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return { currentItems, pageCount, handlePageClick };
};

export default usePaginate;
