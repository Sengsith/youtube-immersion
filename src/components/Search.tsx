import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Don't navigate to search page if empty search input
    if (!searchQuery) {
      return console.log("No search query inside input.");
    }
    // Visual behavior on firefox: doesn't show that it's encoded in address bar but it actually is
    navigate(`/search?search_query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="flex items-center w-full">
      <form onSubmit={handleSubmit}>
        <input
          className="border-sky-400 border"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="ml-4" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
