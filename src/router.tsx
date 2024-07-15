import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import WatchPage from "./pages/WatchPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchPage from "./pages/SearchPage";
import FavoritesPage from "./pages/FavoritesPage";
import { createBrowserRouter } from "react-router-dom";

// We want all our pages to keep the header and sidebar
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
        path: "/watch",
        element: <WatchPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);

export default router;
