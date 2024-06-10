import { Dispatch, SetStateAction } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { User } from "../types/user";

interface Props {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const Login = ({ user, setUser }: Props) => {
  const handleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async ({ code }) => {
      if (code) {
        console.log(code);
        // Send data to backend
        try {
          console.log("Sending access token to backend:", code);
          // Send credential to backend
          const res = await axios.post("http://localhost:3000/login", {
            code,
          });
          setUser(res.data);
          // Handle the response from the backend
          console.log("Login success", res.data);
          alert(`Welcome ${res.data.given_name} at ${res.data.email}`);
        } catch (error) {
          console.log("Error logging in.", error);
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

  return (
    <>
      {user ? (
        <div>
          <p>Welcome, {user.given_name}!</p>
        </div>
      ) : (
        <button onClick={() => handleLogin()}>Login with Google</button>
      )}
    </>
  );
};

export default Login;
