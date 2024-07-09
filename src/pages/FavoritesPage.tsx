import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UserProps } from "../types/userProps";
import useFetchVideos from "../hooks/useFetchVideos";
import Thumbnail from "../components/Thumbnail";
import Login from "../components/Login";
import axios from "axios";

const FavoritesPage = () => {
  const context = useOutletContext<UserProps | null>();
  const user = context?.user ?? null;
  const setUser = context?.setUser ?? (() => {});

  const { searchedData, loading, error, getVideos } = useFetchVideos();

  useEffect(() => {
    if (user) {
      getVideos(user.favorites);
    }
  }, [user]);

  if (!user) {
    return (
      <div>
        <div>Please login so that you can add favorites!</div>
        <Login user={user} setUser={setUser} />
      </div>
    );
  }

  // Unfavorite
  // Unfavorite is clicked
  // Remove(set) the favorites from the user's favorites array locally
  // Update backend
  const handleClickUnfavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!user) {
      alert("Please login to favorite a video!");
      return;
    }
    console.log("unfavorite");
    const videoId = e.currentTarget.id.split("-").pop();

    try {
      // Send videoId to backend
      const res = await axios.post("http://localhost:3000/api/favorite", {
        videoId,
        email: user.email,
        isFavorite: true,
      });
      setUserFavorites(res.data);
    } catch (error) {
      console.error("Error sending videoId to backend for favorites:", error);
    }
  };

  const setUserFavorites = (favorites: any) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, favorites: favorites };
      } else {
        return prevUser;
      }
    });
  };

  return (
    <div>
      {loading && <div>Loading Favorites...</div>}
      {error && <div>{error}</div>}
      <h2>{user ? `${user.given_name}'s ` : ""}FavoritesPage</h2>
      <div className="favorite-video-list">
        {searchedData.map((video) => (
          <>
            <Thumbnail key={video.id} video={video} />
            <button
              className="unfavorite-video-btn cursor-pointer"
              onClick={handleClickUnfavorite}
              id={`unfavorite-btn-${video.id}`}
            >
              Unfavorite
            </button>
          </>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
