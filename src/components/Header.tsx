import { Link } from "react-router-dom";
import Login from "../components/Login";
import Logout from "../components/Logout";
import { UserProps } from "../types/userProps";

const Header = ({ user, setUser, inHeader }: UserProps) => {
  return (
    <div className="header-container">
      <Link to="/">Home</Link>
      <Login user={user} setUser={setUser} inHeader={inHeader} />
      <Logout user={user} setUser={setUser} />
    </div>
  );
};

export default Header;
