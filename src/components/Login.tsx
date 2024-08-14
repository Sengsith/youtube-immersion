import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { UserProps } from "../types/userProps";
import { IconContext } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { BsTriangleFill } from "react-icons/bs";

const Login = ({ user, setUser, inHeader = false }: UserProps) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const access_token = response.access_token;
        const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        if (!userInfoResponse.ok) {
          throw new Error("Failed to fetch user information.");
        }
        const userInfo = await userInfoResponse.json();

        // Check first if user object already exists in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          setUser({
            given_name: userInfo.given_name,
            email: userInfo.email,
            picture: userInfo.picture,
            favorites: [],
          });
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
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
