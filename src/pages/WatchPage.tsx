import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Youtube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import Transcript from "../components/Transcript";
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
      <Youtube videoId={videoId} onReady={onReady} opts={{ width: "420", height: "315" }} />
      <div className="video-details">
        <div className="thumbnail-channel flex gap-2 items-center">
          <img
            className="rounded-full w-10 self-center"
            src={channelThumbnail.url}
            alt={channelTitle}
          />
          <p className="video-channel text-sm">{channelTitle}</p>
        </div>
        <h3 className="video-title">{title}</h3>
        <p className="video-views">{viewCount}</p>
        <p className="video-published">{publishedAt}</p>
      </div>
      <button className="favorite-video-btn cursor-pointer" onClick={handleClickFavorite}>
        {isFavorite ? <p>Unfavorite</p> : <p>Favorite</p>}
      </button>
      <div className="video-transcript">
        <Transcript videoId={videoId ?? ""} player={player} />
      </div>
    </>
  );
};

export default WatchPage;
