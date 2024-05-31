import { useState, useEffect } from "react";
import { Video } from "../types/video";
import { formatDistanceToNow } from "date-fns";

const BASE_VIDEOS_URL = "https://youtube.googleapis.com/youtube/v3/videos?";

const useFetchTrendingVideos = () => {
  const [trendingVideos, setTrendingVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const formatDuration = (duration: string): string => {
      const regex =
        /P(?:([\d.]+)Y)?(?:([\d.]+)M)?(?:([\d.]+)W)?(?:([\d.]+)D)?T(?:([\d.]+)H)?(?:([\d.]+)M)?(?:([\d.]+)S)?/;
      const matches = duration.match(regex);

      if (!matches) {
        throw new Error("Invalid ISO 8601 duration format");
      }

      const hours = parseFloat(matches[5]) || 0;
      const minutes = parseFloat(matches[6]) || 0;
      const seconds = parseFloat(matches[7]) || 0;

      const formattedHours = hours > 0 ? String(hours).padStart(2, "0") + ":" : "";
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(seconds).padStart(2, "0");

      return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
    };

    const formatPublishedDate = (date: string): string => {
      const result = formatDistanceToNow(new Date(date), { addSuffix: true });
      return result.replace(/^about /, "");
    };

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
          publishedAt: formatPublishedDate(item.snippet.publishedAt),
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.default, // or any other size you prefer
          channelTitle: item.snippet.channelTitle,
          duration: formatDuration(item.contentDetails.duration),
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
