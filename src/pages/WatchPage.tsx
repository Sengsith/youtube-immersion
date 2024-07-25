import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Youtube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import { IconContext } from "react-icons";
import Transcript from "../components/Transcript";
import { FavoriteIcon, UnfavoriteIcon } from "../components/FavoriteIcons";
import { UserProps } from "../types/userProps";
import { Video } from "../types/video";
import useQuery from "../hooks/useQuery";
import useFetchVideos from "../hooks/useFetchVideos";
import useFavorites from "../hooks/useFavorites";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";

const WatchPage = () => {
  const query = useQuery();
  const [videoId, setVideoId] = useState<string | undefined>(query.get("v") || undefined);
  const location = useLocation();
  const video: Video = location.state?.video;
  const { searchedData, loading, error, getVideos } = useFetchVideos();
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const context = useOutletContext<UserProps | null>();
  const user = context?.user ?? null;
  const setUser = context?.setUser ?? (() => {});
  const { handleFavorite } = useFavorites(setUser);

  // Styling
  const smallVideoDetails = "text-sm text-gray-300";

  useEffect(() => {
    const newVideoId = query.get("v") || undefined;
    if (newVideoId !== videoId) {
      setVideoId(newVideoId);
    }

    if (!video && videoId) {
      // No video data obtained, but we have an ID from URL
      // fetch with this new videoId
      getVideos(videoId);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user && videoId) {
      setIsFavorite(user.favorites.includes(videoId));
    }
  }, [user]);

  const { title, channelTitle, channelThumbnail, viewCount, publishedAt } =
    video || searchedData[0] || {};

  if (!video && searchedData.length === 0 && !loading) {
    return <div>No video data found.</div>;
  }

  const onReady = (event: YouTubeEvent) => {
    setPlayer(event.target);
  };

  const handleClickFavorite = async () => {
    if (!user) {
      alert("Please login to favorite a video!");
      return;
    }
    handleFavorite({ videoId, email: user.email, isFavorite });
    setIsFavorite(!isFavorite);
  };

  return (
    <>
      {loading && <div>Loading WatchPage...</div>}
      {error && <div>Sorry! {error}</div>}
      <Youtube
        videoId={videoId}
        onReady={onReady}
        opts={{ width: "100%", height: "315" }}
        style={{ marginBottom: "1rem" }}
      />
      <div className="video-details flex flex-col items-start gap-1 px-4">
        <h3 className="video-title font-bold text-lg">{title}</h3>
        <p className={`video-views ${smallVideoDetails}`}>{viewCount}</p>
        <p className={`video-published ${smallVideoDetails}`}>{publishedAt}</p>
        <div className="thumbnail-channel flex gap-2 items-center">
          <img
            className="rounded-full w-10 self-center"
            src={channelThumbnail.url}
            alt={channelTitle}
          />
          <p className={`video-channel ${smallVideoDetails}`}>{channelTitle}</p>
        </div>
        <button
          className="favorite-video-btn cursor-pointer flex items-center gap-1"
          onClick={handleClickFavorite}
        >
          <div className="favorite-icons relative w-4 h-4">
            <FavoriteIcon isVisible={isFavorite} />
            <UnfavoriteIcon isVisible={isFavorite} />
          </div>
          {isFavorite ? <p>Unfavorite</p> : <p>Favorite</p>}
        </button>
        <div className="video-transcript">
          <Transcript videoId={videoId ?? ""} player={player} />
        </div>
      </div>
    </>
  );
};

export default WatchPage;
