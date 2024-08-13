import { User } from "../types/user";

const useFavorites = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  interface FavoriteDetails {
    videoId: string | undefined;
    email: string;
    isFavorite: boolean;
  }

  const handleFavorite = async ({ videoId, email, isFavorite }: FavoriteDetails) => {
    try {
      // Send videoId to backend
      const res = await axios.post("http://localhost:3000/api/favorite", {
        videoId,
        email,
        isFavorite,
      });
      setUserFavorites(res.data);
    } catch (error) {
      console.error("Error sending videoId to backend for favorites:", error);
    }
  };

  const setUserFavorites = (favorites: string[]) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, favorites: favorites };
      } else {
        return prevUser;
      }
    });
  };

  return { handleFavorite };
};

export default useFavorites;
