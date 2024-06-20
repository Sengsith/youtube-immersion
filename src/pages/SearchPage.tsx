import { useEffect } from "react";
import useFetchSearch from "../hooks/useFetchSearch";
import useFetchVideos from "../hooks/useFetchVideos";
import { useParams } from "react-router-dom";
import Thumbnail from "../components/Thumbnail";

const SearchPage = () => {
  // searchQuery is from the url
  const { searchQuery } = useParams();
  console.log("searchQuery:", searchQuery);

  const {
    searchResults,
    loading: searchLoading,
    error: searchError,
    getSearchData,
  } = useFetchSearch();

  const { searchedData, loading: videoLoading, error: videoError, getVideos } = useFetchVideos();

  useEffect(() => {
    if (searchQuery?.length !== 0) {
      getSearchData(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchResults.length !== 0) {
      getVideos(searchResults);
    }
  }, [searchResults]);

  return (
    <div className="search-page">
      {(searchLoading || videoLoading) && <div>Loading...</div>}
      {searchError && <div>{searchError}</div>}
      {videoError && <div>{videoError}</div>}
      <h2>Search Results</h2>
      <div className="search-results-list">
        {searchedData.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
