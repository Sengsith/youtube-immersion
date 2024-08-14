import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SkeletonTheme } from "react-loading-skeleton";
import router from "./router";

const App = () => {
  return (
    <div id="app" className="font-roboto min-h-screen bg-zinc-900 text-white pb-4">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
          <RouterProvider router={router} />
        </SkeletonTheme>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
