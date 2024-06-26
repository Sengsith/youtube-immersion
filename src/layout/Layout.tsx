import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { User } from "../types/user";

const Layout = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  // Only want to pass state into WatchPage
  const shouldPassProps = location.pathname.includes("/watch");

  return (
    <>
      <div className="layout">
        <Header user={user} setUser={setUser} inHeader={true} />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Outlet context={shouldPassProps ? { user, setUser } : null} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
