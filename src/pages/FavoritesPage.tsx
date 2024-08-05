import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UserProps } from "../types/userProps";
import useFetchVideos from "../hooks/useFetchVideos";
import useFavorites from "../hooks/useFavorites";
import Thumbnail from "../components/Thumbnail";
import Login from "../components/Login";
import { FavoriteIcon } from "../components/FavoriteIcons";
import ThumbnailSkeleton from "../components/ThumbnailSkeleton";

const FavoritesPage = () => {
  const context = useOutletContext<UserProps | null>();
  const user = context?.user ?? null;
  const setUser = context?.setUser ?? (() => {});
  const { handleFavorite } = useFavorites(setUser);

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

  const handleClickUnfavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Unfavorite is clicked
    // Remove(set) the favorites from the user's favorites array locally
    // Update backend
    if (!user) {
      alert("Please login to favorite a video!");
      return;
    }
    const videoId = e.currentTarget.id.split("-").pop();

    handleFavorite({ videoId, email: user.email, isFavorite: true });
  };

  return (
    <>
      {error && <div>{error}</div>}
      <h2 className="mb-4 px-4 py-4 text-lg font-bold">
        {user ? `${user.given_name}'s ` : ""}favorite videos
      </h2>
      <div id="favorite-video-list" className="grid gap-x-4 grid-cols-auto-fit-20rem md:p-4">
        {loading ? (
          <ThumbnailSkeleton cards={15} />
        ) : (
          searchedData?.map((video) => (
            <div className="favorite-item" key={video.id}>
              <Thumbnail video={video} />
              <button
                className="unfavorite-video-btn cursor-pointer flex items-center gap-1 px-4 mb-4 -mt-7"
                onClick={handleClickUnfavorite}
                id={`unfavorite-btn-${video.id}`}
              >
                <div className="w-4 h-4">
                  <FavoriteIcon isVisible={true} />
                </div>
                <p>Unfavorite</p>
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default FavoritesPage;
