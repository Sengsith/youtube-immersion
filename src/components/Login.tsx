import { Dispatch, SetStateAction } from "react";
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { User } from "../types/user";

interface Props {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const Login = ({ user, setUser }: Props) => {
  const handleLoginSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      // Send data to backend
      try {
        // Send credential to backend
        const res = await axios.post("http://localhost:3000/login", {
          token: response.credential,
        });
        setUser(res.data);
        // Handle the response from the backend
        console.log("Login success", res.data);
        alert(`Welcome ${res.data.given_name} at ${res.data.email}`);
      } catch (error) {
        console.log("Error logging in.", error);
      }
    } else {
      console.log("No credentials returned");
    }
  };

  const handleLoginFailure = () => console.log("Login Failed");

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      {user ? (
        <div>
          <p>Welcome, {user.given_name}!</p>
        </div>
      ) : (
        <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure}></GoogleLogin>
      )}
    </GoogleOAuthProvider>
  );
};

export default Login;
