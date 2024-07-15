import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { User } from "../types/user";

const Layout = () => {
  // User state passed down into various components using context
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  // Only want to pass state into WatchPage or FavoritesPage
  const shouldPassProps =
    location.pathname.includes("/watch") || location.pathname.includes("/favorites");

  useEffect(() => {
    // Initialize user from localStorage if it exists
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever user changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

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
