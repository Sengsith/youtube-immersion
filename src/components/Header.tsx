import { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";
import Logout from "../components/Logout";
import { User } from "../types/user";

const Header = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Login user={user} setUser={setUser} />
      <Logout user={user} setUser={setUser} />
    </div>
  );
};

export default Header;
