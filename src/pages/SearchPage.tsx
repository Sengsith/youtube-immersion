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
  const {
    searchResults,
    loading: searchLoading,
    error: searchError,
    getSearchData,
  } = useFetchSearch();

  // Variables for actual video stats and data
  const {
    searchedData,
    setSearchedData,
    loading: videoLoading,
    error: videoError,
    getVideos,
  } = useFetchVideos();

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
    <div className="search-page">
      {(searchLoading || videoLoading) && <div>Loading...</div>}
      {searchError && <div>{searchError}</div>}
      {videoError && <div>{videoError}</div>}
      <div className="search-results-list">
        {searchedData?.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
