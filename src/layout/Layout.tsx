import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="layout">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
