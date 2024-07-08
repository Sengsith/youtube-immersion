import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UserProps } from "../types/userProps";
import useFetchVideos from "../hooks/useFetchVideos";
import Thumbnail from "../components/Thumbnail";

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

  return (
    <div>
      {loading && <div>Loading Favorites...</div>}
      {error && <div>{error}</div>}
      <h2>{user ? `${user.given_name}'s ` : ""}FavoritesPage</h2>
      <div className="favorite-video-list">
        {searchedData.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
