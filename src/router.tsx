import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import { createBrowserRouter } from "react-router-dom";

// We want HomePage and WatchPage to keep the header and sidebar
// One thing to think about: WatchPage by itself actually won't have anything
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/watch/:videoId",
        element: <WatchPage />,
      },
      {
        path: "/search/:searchQuery",
        element: <SearchPage />,
      },
    ],
  },
]);

export default router;
