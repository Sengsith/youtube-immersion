import { useEffect } from "react";
import useFetchSearch from "../hooks/useFetchSearch";
import useFetchVideos from "../hooks/useFetchVideos";
import useQuery from "../hooks/useQuery";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Thumbnail from "../components/Thumbnail";

const SearchPage = () => {
  const query = useQuery();
  const searchQuery = query.get("search_query") || "";

  // Variables for videoID from a search query
  const { searchResults, loading: searchLoading, error: searchError, getSearchData } = useFetchSearch();

  // Variables for actual video stats and data
  const { searchedData, setSearchedData, loading: videoLoading, error: videoError, getVideos } = useFetchVideos();

  useEffect(() => {
    // Ignore empty input queries
    if (searchQuery && searchQuery.length > 0) {
      getSearchData(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    // Ignore empty searchResults
    if (searchResults && searchResults.length > 0) {
      getVideos(searchResults);
    }
  }, [searchResults]);

  useInfiniteScroll(searchedData, setSearchedData);

  return (
    <>
      {(searchLoading || videoLoading) && <div>Loading...</div>}
      {searchError && <div>{searchError}</div>}
      {videoError && <div>{videoError}</div>}
      <div id="searc-results-list" className="grid gap-x-4 grid-cols-auto-fit-20rem">
        {searchedData?.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
