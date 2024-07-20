import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Login from "./Login";
import { UserProps } from "../types/userProps";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";

const Header = ({ user, setUser, inHeader }: UserProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header
      className={`text-lg header-container flex items-center px-4 py-4 bg-blue-400 sticky top-0 left-0 right-0 ${
        showSearch ? "justify-end" : "justify-between"
      }`}
    >
      {!showSearch && (
        <div id="flex-left">
          <Link to="/">Home</Link>
        </div>
      )}
      <div id="flex-right" className={`flex gap-4 items-center ${showSearch && "w-full"}`}>
        {!showSearch && <Login user={user} setUser={setUser} inHeader={inHeader} />}
        {user && !showSearch && (
          <Link to="/favorites" state={user}>
            Favorites
          </Link>
        )}
        {showSearch && <Search />}
        <button onClick={() => setShowSearch(!showSearch)}>
          {!showSearch ? <FaMagnifyingGlass /> : <IoCloseCircleSharp />}
        </button>
      </div>
    </header>
  );
};

export default Header;
