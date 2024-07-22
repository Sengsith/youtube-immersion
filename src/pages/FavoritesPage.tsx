import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UserProps } from "../types/userProps";
import useFetchVideos from "../hooks/useFetchVideos";
import useFavorites from "../hooks/useFavorites";
import usePaginate from "../hooks/usePaginate";
import Thumbnail from "../components/Thumbnail";
import Login from "../components/Login";
// import Paginate from "../components/Paginate";

const FavoritesPage = () => {
  const context = useOutletContext<UserProps | null>();
  const user = context?.user ?? null;
  const setUser = context?.setUser ?? (() => {});
  const { handleFavorite } = useFavorites(setUser);

  const { searchedData, loading, error, getVideos } = useFetchVideos();

  // const { currentItems, pageCount, handlePageClick } = usePaginate({
  //   items: searchedData,
  //   itemsPerPage: 5,
  // });

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
    <div>
      {loading && <div>Loading Favorites...</div>}
      {error && <div>{error}</div>}
      <h2 className="mb-4">{user ? `${user.given_name}'s ` : ""}favorite videos</h2>
      <div className="favorite-video-list">
        {searchedData?.map((video) => (
          <div className="favorite-item" key={video.id}>
            <Thumbnail video={video} />
            <button
              className="unfavorite-video-btn cursor-pointer"
              onClick={handleClickUnfavorite}
              id={`unfavorite-btn-${video.id}`}
            >
              Unfavorite
            </button>
          </div>
        ))}
      </div>
      {/* <Paginate pageCount={pageCount} handlePageClick={handlePageClick} /> */}
    </div>
  );
};

export default FavoritesPage;
