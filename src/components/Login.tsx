import { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { UserProps } from "../types/userProps";
import { FcGoogle } from "react-icons/fc";

const Login = ({ user, setUser, inHeader = false }: UserProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      if (code) {
        // Send data to backend
        try {
          // Send credential to backend
          const res = await axios.post("http://localhost:3000/api/login", {
            code,
          });
          setUser(res.data);
          // Handle the response from the backend
          alert(`Welcome ${res.data.given_name} at ${res.data.email}`);
        } catch (error) {
          console.error("Error logging in.", error);
          if (axios.isAxiosError(error)) {
            console.error("Axios error response:", error.response);
          }
        }
      } else {
        console.log("No credentials returned");
      }
    },
    onError: () => {
      console.log("Login failed");
    },
    scope: "profile email https://www.googleapis.com/auth/youtube.force-ssl",
  });

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {user ? (
        <div>
          {inHeader && (
            <button className="" onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
              {user.given_name}
            </button>
          )}
          {isOptionsOpen && (
            <div className="user-options text-white absolute bg-black bg-opacity-40 p-2 rounded-md">
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      ) : (
        <button className="flex items-center gap-2" onClick={() => handleLogin()}>
          <FcGoogle />
          <p>Sign in with Google</p>
        </button>
      )}
    </>
  );
};

export default Login;
