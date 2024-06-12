import useFetchVideoCaptions from "../hooks/useFetchVideoCaptions";
import { UserProps } from "../types/userProps";
import Login from "../components/Login";

interface TranscriptProps extends UserProps {
  videoId: string | undefined;
}

const Transcript = ({ user, setUser, videoId }: TranscriptProps) => {
  // Want to check if the user is already logged in or not.
  // If the user is logged in, we need to make a call to get their access token and then send a request to youtube API to download captions
  // IF the user is NOT logged in, they need to login and then do the case above

  if (!user) {
    return (
      <div>
        <p>User is not logged in to use transcript.</p>
        <Login user={user} setUser={setUser} />
      </div>
    );
  }

  const { captions, loading, error } = useFetchVideoCaptions(videoId);

  return (
    <div className="transcript-container">
      <h3>Transcript</h3>
      {loading && <div>Loading...</div>}
      {error && <div>Error!</div>}
    </div>
  );
};

export default Transcript;
