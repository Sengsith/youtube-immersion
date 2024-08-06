import { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { UserProps } from "../types/userProps";
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { BsTriangleFill } from "react-icons/bs";

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
        } catch (error) {
          console.error("Error logging in.", error);
          if (axios.isAxiosError(error)) {
            console.error("Axios error response:", error.response);
          }
        }
      } else {
        console.error("No credentials returned");
      }
    },
    onError: () => {
      console.error("Login failed");
    },
    scope: "profile email https://www.googleapis.com/auth/youtube.force-ssl",
  });

  const handleLogout = () => {
    setUser(null);
    setIsOptionsOpen(false);
  };

  return (
    <>
      {user ? (
        <>
          {inHeader && (
            <button
              id="open-user-options"
              className="flex gap-1"
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
            >
              <img className="w-10 rounded-full" src={user.picture} alt={user.given_name} />
              <IconContext.Provider
                value={{
                  color: "white",
                  className: `m-auto w-3 transition duration-300 ease-in-out ${
                    isOptionsOpen ? "rotate-180" : "rotate-0"
                  }`,
                }}
              >
                <BsTriangleFill />
              </IconContext.Provider>
            </button>
          )}
          <div
            id="user-options"
            className={`text-white absolute bg-black p-2 rounded-md top-16 transition-all border-2 border-blue-500 ${
              isOptionsOpen ? "bg-opacity-80 opacity-1 visible" : "bg-opacity-0 opacity-0 invisible"
            }`}
          >
            <p>{user.given_name}</p>
            <button onClick={handleLogout}>Log out</button>
          </div>
        </>
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
