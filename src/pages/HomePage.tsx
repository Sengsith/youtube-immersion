import { useEffect, useRef } from "react";
import useFetchVideos from "../hooks/useFetchVideos";
import Thumbnail from "../components/Thumbnail";
import { Video } from "../types/video";

const HomePage = () => {
  const { trendingResults, setTrendingResults, loading, error, getVideos } = useFetchVideos();
  const loadingRef = useRef(false);

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!trendingResults || loadingRef.current) return;
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      ) {
        return;
      }
      loadingRef.current = true;
      const newDummyData: Video[] = Array.from({ length: 15 }, (_, index) => ({
        id: `dummy-${trendingResults.length + index}`,
        publishedAt: "2023-01-01",
        title: `Dummy Video ${trendingResults.length + index}`,
        thumbnail: { url: "https://via.placeholder.com/1280x720", height: 720, width: 1280 },
        channelThumbnail: { url: "https://via.placeholder.com/800x800", height: 800, width: 800 },
        channelTitle: "Dummy Channel",
        duration: "5:00",
        viewCount: "1K views",
      }));

      setTrendingResults((prevTrendingResults) => [...prevTrendingResults, ...newDummyData]);
      loadingRef.current = false;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [trendingResults]);

  return (
    <>
      {loading && <div>Loading Trending...</div>}
      {error && <div>{error}|</div>}
      <div className="trending-video-list">
        {trendingResults?.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
};

export default HomePage;
