import { useState } from "react";

const useFetchSearch = () => {
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getSearchData = async (query: string | undefined) => {
    if (!query) {
      console.log("No query was passed into getSearchData.");
      return;
    }

    try {
      setLoading(true);
      console.log("query:", query);
      const BASE_URL = "https://youtube.googleapis.com/youtube/v3/search?";
      const part = "part=snippet&";
      const maxResults = "maxResults=3&";
      const q = `q=${query}&`;
      const regionCode = "regionCode=JP&";
      const relevanceLanguage = "relevanceLanguage=JA&";
      const type = "type=video&";
      const key = `key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
      const params = part + maxResults + q + regionCode + relevanceLanguage + type + key;
      const url = BASE_URL + params;
      console.log("search url:", url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("search data:", data);
      const searches = data.items?.map((item: any) => item.id.videoId);

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
