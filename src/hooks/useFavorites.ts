import { User } from "../types/user";

const useFavorites = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  interface FavoriteDetails {
    videoId: string | undefined;
    isFavorite: boolean;
  }

  const handleFavorite = ({ videoId, isFavorite }: FavoriteDetails) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const newFavorites = isFavorite
        ? prevUser.favorites.filter((id) => id !== videoId) // Unfavorite
        : [...prevUser.favorites, videoId].filter((id): id is string => !!id); // Favorite
      // Ensure undefined values are removed from newFavorites

      return {
        ...prevUser,
        favorites: newFavorites,
      };
    });
  };

  return { handleFavorite };
};

export default useFavorites;
