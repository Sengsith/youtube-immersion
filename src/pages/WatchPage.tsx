import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Youtube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import Transcript from "../components/Transcript";
import { FavoriteIcon, UnfavoriteIcon } from "../components/FavoriteIcons";
import { UserProps } from "../types/userProps";
import { Video } from "../types/video";
import useQuery from "../hooks/useQuery";
import useFetchVideos from "../hooks/useFetchVideos";
import useFavorites from "../hooks/useFavorites";

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

  // Fixes extra padding at the bottom
  useEffect(() => {
    const app = document.querySelector("#app");
    if (app) app.classList.remove("pb-4");
    return () => {
      if (app) app.classList.add("pb-4");
    };
  }, []);

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
    <div id="watch-page-container" className="flex flex-col h-[calc(100vh-56px)] overlfow-hidden">
      {loading && <div>Loading WatchPage...</div>}
      {error && <div>Sorry! {error}</div>}
      <Youtube
        videoId={videoId}
        onReady={onReady}
        opts={{ width: "100%", height: "315" }}
        style={{ marginBottom: "1rem" }}
      />
      <div id="video-details-container" className="flex flex-col overflow-y-hidden">
        <div id="video-details" className="flex flex-col items-start gap-1 px-4 mb-4">
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
        </div>
        <Transcript videoId={videoId ?? ""} player={player} />
      </div>
    </div>
  );
};

export default WatchPage;
