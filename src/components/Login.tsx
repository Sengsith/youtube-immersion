import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { UserProps } from "../types/userProps";

const Login = ({ user, setUser, inHeader = false }: UserProps) => {
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

  return (
    <>
      {user ? (
        <div>{inHeader && <p>Welcome, {user.given_name}!</p>}</div>
      ) : (
        <button onClick={() => handleLogin()}>Login with Google</button>
      )}
    </>
  );
};

export default Login;
