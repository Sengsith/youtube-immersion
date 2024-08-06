import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Don't navigate to search page if empty search input
    if (!searchQuery) return;
    // Visual behavior on firefox: doesn't show that it's encoded in address bar but it actually is
    navigate(`/search?search_query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    // w-calc is 100%-size of sibling button
    <div id="search-bar-container" className="flex items-center w-full">
      <form id="search-form" onSubmit={handleSubmit} className="flex items-center w-full">
        <input
          className="w-full px-2 py-1.5 border-transparent text-black"
          type="text"
          value={searchQuery}
          placeholder="Search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="ml-4" type="submit">
          <FaMagnifyingGlass />
        </button>
      </form>
    </div>
  );
};

export default Search;
