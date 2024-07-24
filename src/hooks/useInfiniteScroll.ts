import { useEffect, useRef } from "react";
import { Video } from "../types/video";

const useInfiniteScroll = (
  videos: Video[],
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>,
  length: number = 5
) => {
  const loadingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (loadingRef.current) return;
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      loadingRef.current = true;

      const newDummyData: Video[] = Array.from({ length }, (_, index) => ({
        id: `dummy-${videos.length + index}`,
        publishedAt: "2023-01-01",
        title: `Dummy Video ${videos.length + index}`,
        thumbnail: { url: "https://via.placeholder.com/1280x720", height: 720, width: 1280 },
        channelThumbnail: { url: "https://via.placeholder.com/800x800", height: 800, width: 800 },
        channelTitle: "Dummy Channel",
        duration: "5:00",
        viewCount: "1K views",
      }));

      setVideos((prevVideos) => [...prevVideos, ...newDummyData]);
      loadingRef.current = false;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [videos]);
};

export default useInfiniteScroll;
