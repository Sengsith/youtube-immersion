import { useEffect, useState, useRef } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Youtube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import Transcript from "../components/Transcript";
import { FavoriteIcon, UnfavoriteIcon } from "../components/FavoriteIcons";
import { UserProps } from "../types/userProps";
import { Video } from "../types/video";
import useQuery from "../hooks/useQuery";
import useFetchVideos from "../hooks/useFetchVideos";
import useFavorites from "../hooks/useFavorites";
import { FaArrowCircleRight } from "react-icons/fa";

const WatchPage = () => {
  const query = useQuery();
  const [videoId, setVideoId] = useState<string | undefined>(query.get("v") || undefined);
  const location = useLocation();
  const video: Video = location.state?.video;
  const { searchedData, loading, error, getVideos } = useFetchVideos();
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(true);

  // Player
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
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

    // Youtube Iframe styling
    const youtubeIframe = document.getElementById("youtube-iframe");
    youtubeIframe?.classList.add("w-full", "h-full", "absolute");

    return () => {
      if (app) app.classList.add("pb-4");

      stopTrackingTime();
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

  const onStateChange = (event: { data: number }) => {
    if (event.data === 1) {
      // 1 correspondes to YT.PlayerState.PLAYING
      startTrackingTime();
    } else {
      stopTrackingTime();
    }
  };

  const startTrackingTime = () => {
    if (!player) return;
    intervalRef.current = window.setInterval(async () => {
      setCurrentTime(await player.getCurrentTime());
    }, 1000);
  };

  const stopTrackingTime = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
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
    <div id="watch-page-container" className="flex flex-col overflow-hidden h-[calc(100vh-56px)]">
      {loading && <div>Loading WatchPage...</div>}
      {error && <div>Sorry! {error}</div>}
      <Youtube
        id="youtube-iframe"
        videoId={videoId}
        onReady={onReady}
        onStateChange={onStateChange}
        opts={{ playerVars: { controls: 1 } }}
        style={{ marginBottom: "1rem" }}
        className="relative pb-56.25% w-full"
      />
      <div id="video-details-container" className="flex flex-col flex-grow overflow-y-hidden">
        {showDetails && (
          <div id="video-details" className="flex flex-col items-start gap-2 px-4 mb-4">
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
            <button
              className="flex items-center gap-4 text-xl"
              onClick={() => {
                setShowTranscript(true);
                setShowDetails(false);
              }}
            >
              <p>Transcript</p>
              <FaArrowCircleRight />
            </button>
          </div>
        )}
        <Transcript
          videoId={videoId ?? ""}
          player={player}
          currentTime={currentTime}
          showTranscript={showTranscript}
          setShowTranscript={setShowTranscript}
          setShowDetails={setShowDetails}
        />
      </div>
    </div>
  );
};

export default WatchPage;
