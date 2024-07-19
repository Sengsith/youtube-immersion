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
    <div
      className={`text-lg header-container flex items-center px-4 py-6 bg-blue-400 ${
        showSearch ? "justify-end" : "justify-between"
      }`}
    >
      {!showSearch && (
        <div className="flex-left">
          <Link to="/">Home</Link>
        </div>
      )}
      <div className="flex-right flex gap-4">
        {!showSearch && <Login user={user} setUser={setUser} inHeader={inHeader} />}
        {user && (
          <Link to="/favorites" state={user}>
            Favorites
          </Link>
        )}
        {showSearch && <Search />}
        <button onClick={() => setShowSearch(!showSearch)}>
          {!showSearch ? <FaMagnifyingGlass /> : <IoCloseCircleSharp />}
        </button>
      </div>
    </div>
  );
};

export default Header;
