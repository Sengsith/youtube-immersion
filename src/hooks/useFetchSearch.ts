import { useState } from "react";

const useFetchSearch = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSearchData = async (query: string | undefined) => {
    if (!query) {
      console.log("No query was passed into getSearchData.");
      return;
    }

    try {
      const BASE_URL = "https://youtube.googleapis.com/youtube/v3/search?";
      const part = "part=snippet&";
      const maxResults = "maxResults=3&";
      const regionCode = "regionCode=JP&";
      const relevanceLanguage = "relevanceLanguage=JA&";
      const type = "type=video&";
      const key = `key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
      const params = part + maxResults + query + regionCode + relevanceLanguage + type + key;
      const url = BASE_URL + params;

      const response = await fetch(url);
      const data = await response.json();
      const searches = data.items?.map((item: any) => item.id.videoId);

      console.log("Sending searches back to SearchPage:", searches);
      setSearchResults(searches);
      setLoading(false);
    } catch (error) {
      console.error("Error getting  search results:", error);
      setError("Error getting search results.");
      setLoading(false);
    }
  };

  return { searchResults, loading, error, getSearchData };
};

export default useFetchSearch;
