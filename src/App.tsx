import "./App.css";
import { RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import router from "./router";

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
