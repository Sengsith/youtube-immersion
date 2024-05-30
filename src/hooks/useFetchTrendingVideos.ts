import { useState, useEffect } from "react";
import { Video } from "../types/video";

const BASE_VIDEOS_URL = "https://youtube.googleapis.com/youtube/v3/videos?";

const useFetchTrendingVideos = () => {
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingVideos = async () => {
      try {
        const part = "part=snippet%2C%20contentDetails%2C%20statistics&";
        const chart = "chart=mostPopular&";
        const regionCode = "regionCode=JP&";
        const key = `key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
        const params = part + chart + regionCode + key;
        const url = BASE_VIDEOS_URL + params;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const videos = data.items.map((item: any) => ({
          id: item.id,
          publishedAt: new Date(item.snippet.publishedAt),
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default, // or any other size you prefer
          channelTitle: item.snippet.channelTitle,
          duration: item.contentDetails.duration,
          viewCount: item.statistics.viewCount,
        }));
        setTrendingVideos(videos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending videos:", error);
        setError("Failed to fetch trending videos");
        setLoading(false);
      }
    };

    fetchTrendingVideos();
  }, []);

  return { trendingVideos, loading, error };
};

export default useFetchTrendingVideos;
