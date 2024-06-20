import { Link } from "react-router-dom";
import Search from "./Search";
import Login from "./Login";
import Logout from "./Logout";
import { UserProps } from "../types/userProps";

const Header = ({ user, setUser, inHeader }: UserProps) => {
  return (
    <div className="header-container">
      <Link to="/">Home</Link>
      <Search />
      <Login user={user} setUser={setUser} inHeader={inHeader} />
      <Logout user={user} setUser={setUser} />
    </div>
  );
};

export default Header;
