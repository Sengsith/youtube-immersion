import { useEffect, useState } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import Transcript from "../components/Transcript";
import { UserProps } from "../types/userProps";
import useQuery from "../hooks/useQuery";
import useFetchVideos from "../hooks/useFetchVideos";
import { Video } from "../types/video";

const WatchPage = () => {
  const query = useQuery();
  // const videoId = query.get("v");
  const [videoId, setVideoId] = useState<string | null>(query.get("v"));
  const location = useLocation();
  const video: Video = location.state?.video;
  const { searchedData, loading, error, getVideos } = useFetchVideos();

  console.log("videoId:", videoId);
  console.log("video:", video);

  useEffect(() => {
    const newVideoId = query.get("v");
    if (newVideoId !== videoId) {
      setVideoId(newVideoId);
    }

    if (!video && videoId) {
      console.log("No video data obtained, but we have an ID from URL");
      // Run the fetch with this new videoId
      getVideos(videoId);
    }
  }, [location.pathname]);

  const { title, channelTitle, viewCount, duration, publishedAt } = video || searchedData[0] || {};
  console.log("video:", video);
  console.log("searchedData[0]:,", searchedData[0]);

  // const context = useOutletContext<UserProps | null>();
  // const user = context?.user ?? null;
  // const setUser = context?.setUser ?? (() => {});

  if (!video && searchedData.length === 0 && !loading) {
    return <div>No video data found.</div>;
  }

  return (
    <>
      {loading && <div>Loading WatchPage...</div>}
      {error && <div>Sorry! {error}</div>}
      <h2>{title}</h2>
      <iframe
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        allowFullScreen
      ></iframe>
      <div className="video-details">
        <h3>{channelTitle}</h3>
        <p>{viewCount}</p>
        <p>{duration}</p>
        <p>{publishedAt}</p>
      </div>
      <div className="video-transcript">
        <Transcript videoId={videoId} />
      </div>
    </>
  );
};

export default WatchPage;
