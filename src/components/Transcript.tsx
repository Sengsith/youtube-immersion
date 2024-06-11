import useFetchVideoCaptions from "../hooks/useFetchVideoCaptions";
import { UserProps } from "../types/userProps";
import Login from "../components/Login";

const Transcript = ({ user, setUser }: UserProps) => {
  // Want to check if the user is already logged in or not.
  // If the user is logged in, we need to make a call to get their access token and then send a request to youtube API to download captions
  // IF the user is NOT logged in, they need to login and then do the case above

  if (!user) {
    <div>User is not logged in to use transcript.</div>;
  }

  console.log("user: ", user);
  console.log("setUser: ", setUser);

  return (
    <div className="transcript-container">
      <h3>Transcript</h3>
      <Login user={user} setUser={setUser} />
    </div>
  );
};

export default Transcript;
