import { IconContext } from "react-icons";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

const icon = "transition-all duration-300 ease-in-out absolute flex justify-center items-center";

export const FavoriteIcon = ({ isVisible }: { isVisible: boolean }) => (
  <IconContext.Provider
    value={{
      color: "hsl(213, 94%, 68%)",
      className: `${icon} ${isVisible ? "opacity-100 block" : "opacity-0 invisible"}`,
    }}
  >
    <MdFavorite />
  </IconContext.Provider>
);

export const UnfavoriteIcon = ({ isVisible }: { isVisible: boolean }) => (
  <IconContext.Provider
    value={{
      color: "hsl(213, 94%, 68%)",
      className: `${icon} ${isVisible ? "opacity-0 invisible" : "opacity-100 block"}`,
    }}
  >
    <MdFavoriteBorder />
  </IconContext.Provider>
);
