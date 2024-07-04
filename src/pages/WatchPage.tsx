import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Youtube, { YouTubeEvent, YouTubePlayer } from "react-youtube";
import Transcript from "../components/Transcript";
import { UserProps } from "../types/userProps";
import useQuery from "../hooks/useQuery";
import useFetchVideos from "../hooks/useFetchVideos";
import { Video } from "../types/video";
import axios from "axios";

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

  useEffect(() => {
    const newVideoId = query.get("v") || undefined;
    if (newVideoId !== videoId) {
      setVideoId(newVideoId);
    }

    if (!video && videoId) {
      console.log("No video data obtained, but we have an ID from URL");
      // Run the fetch with this new videoId
      getVideos(videoId);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (user && videoId) {
      setIsFavorite(user.favorites.includes(videoId) ? true : false);
    }
  }, [user]);

  const { title, channelTitle, viewCount, duration, publishedAt } = video || searchedData[0] || {};
  console.log("video:", video);
  console.log("searchedData[0]:,", searchedData[0]);

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
    console.log("Favorite clicked");
    try {
      // Send videoId to backend
      const res = await axios.post("http://localhost:3000/api/favorite", {
        videoId,
        email: user.email,
        isFavorite,
      });
      setIsFavorite(!isFavorite);
      setUserFavorites(res.data);
    } catch (error) {
      console.error("Error sending videoId to backend for favorites:", error);
    }
  };

  const setUserFavorites = (favorites: any) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, favorites: favorites };
      } else {
        return prevUser;
      }
    });
  };

  // TODO: Whenever we paste a videoId into the URL, it logs us out

  return (
    <>
      {loading && <div>Loading WatchPage...</div>}
      {error && <div>Sorry! {error}</div>}
      <h2>{title}</h2>
      <Youtube videoId={videoId} onReady={onReady} opts={{ width: "420", height: "315" }} />
      <div className="video-details">
        <h3>{channelTitle}</h3>
        <p>{viewCount}</p>
        <p>{duration}</p>
        <p>{publishedAt}</p>
      </div>
      <div className="favorite-video-btn cursor-pointer" onClick={handleClickFavorite}>
        {isFavorite ? <p>Unfavorite</p> : <p>Favorite</p>}
      </div>
      <div className="video-transcript">
        <Transcript videoId={videoId ?? ""} player={player} />
      </div>
    </>
  );
};

export default WatchPage;
