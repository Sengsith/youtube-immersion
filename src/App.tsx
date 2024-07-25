import "./App.css";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./router";

function App() {
  return (
    <div id="app" className="font-roboto min-h-screen bg-zinc-900 text-white pb-4">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
