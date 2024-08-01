import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import Login from "./Login";
import { UserProps } from "../types/userProps";
import { IconContext } from "react-icons";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoCloseCircleSharp } from "react-icons/io5";

const Header = ({ user, setUser, inHeader }: UserProps) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header id="header-container" className="text-lg px-4 py-2 bg-blue-400 sticky z-10 top-0 left-0 right-0 h-14 flex flex-row justify-between items-center md:px-8 md:gap-4">
      <div id="header-left" className={`${showSearch ? "hidden md:block" : "block"}`}>
        <Link to="/">Home</Link>
      </div>
      <div id="header-center" className={`gap-4 w-full md:flex md:w-[35rem] ${showSearch ? "flex" : "hidden"}`}>
        <Search />
        <button
          className="md:hidden"
          onClick={() => {
            setShowSearch(false);
          }}
        >
          <IconContext.Provider
            value={{
              className: "h-6 w-6",
            }}
          >
            <IoCloseCircleSharp />
          </IconContext.Provider>
        </button>
      </div>
      <div id="header-right" className={`flex gap-4 items-center ${showSearch ? "hidden md:flex" : "block"}`}>
        <Login user={user} setUser={setUser} inHeader={inHeader} />
        {user && (
          <Link to="/favorites" state={user}>
            Favorites
          </Link>
        )}
        <button className="md:hidden" onClick={() => setShowSearch(true)}>
          <FaMagnifyingGlass />
        </button>
      </div>
    </header>
  );
};

export default Header;
