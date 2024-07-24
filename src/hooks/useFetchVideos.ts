import { useState } from "react";
import { Video } from "../types/video";
import { formatDistanceToNow } from "date-fns";

const useFetchVideos = () => {
  const [trendingResults, setTrendingResults] = useState<Video[]>([]);
  const [searchedData, setSearchedData] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatDuration = (duration: string): string => {
    if (duration === "P0D" || duration === "PT0S") {
      return "LIVE";
    }
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

  const formatViews = (views: string): string => {
    const viewsValue = parseInt(views, 10);
    if (viewsValue >= 1_000_000_000) {
      return `${(viewsValue / 1_000_000_000).toFixed(1)}B views`;
    } else if (viewsValue >= 1_000_000) {
      return `${(viewsValue / 1_000_000).toFixed(1)}M views`;
    } else if (viewsValue >= 1_000) {
      return `${(viewsValue / 1_000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  const getVideos = async (videoIds?: string | string[]) => {
    // Return if videoIds was passed in but empty
    if (videoIds === null || videoIds?.length === 0) {
      console.log("No video IDs passed in or videoIds array is empty");
      return;
    }
    try {
      setLoading(true);
      const BASE_VIDEOS_URL = "https://youtube.googleapis.com/youtube/v3/videos?";
      const part = "part=snippet%2CcontentDetails%2Cstatistics&";
      // Search page requires string[] video ids (id=""&id=""&id=""...)
      // Possible that just a single string can be passed in
      const IDs =
        typeof videoIds === "string"
          ? `id=${videoIds}&`
          : videoIds
              ?.map((videoId) => {
                return `id=${videoId}&`;
              })
              .join("");
      const chart = "chart=mostPopular&";
      const regionCode = "regionCode=JP&";
      // Default maxResults is 5 if undefined
      const maxResults = `maxResults=15&`;
      const key = `key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
      // Trending page requires chart param
      // Search page requires IDs, doesn't need chart or regionCode
      const params = videoIds
        ? part + IDs + regionCode + maxResults + key
        : part + chart + regionCode + maxResults + key;
      const url = BASE_VIDEOS_URL + params;
      const response = await fetch(url);
      const data = await response.json();

      // Array of IDs for channel thumbnail API call
      const channelIds = data.items.map((item: any) => item.snippet.channelId);
      const uniqueChannelIds = Array.from(new Set(channelIds));

      // channels.list api call
      const CHANNEL_URL = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${uniqueChannelIds.join(
        ","
      )}&key=${import.meta.env.VITE_YOUTUBE_API_KEY}`;
      const channelResponse = await fetch(CHANNEL_URL);
      const channelData = await channelResponse.json();

      // Reduce unique channel ids to a key,value pair (id, thumbnail)
      const channelThumbnails = channelData.items.reduce((acc: any, channel: any) => {
        acc[channel.id] = channel.snippet.thumbnails.high || channel.snippet.thumbnails.medium;
        return acc;
      }, {});

      const videos = data.items?.map((item: any) => ({
        id: item.id,
        publishedAt: formatPublishedDate(item.snippet.publishedAt),
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.maxres || item.snippet.thumbnails.standard,
        channelThumbnail: channelThumbnails[item.snippet.channelId],
        channelTitle: item.snippet.channelTitle || "Unknown Channel",
        duration: formatDuration(item.contentDetails.duration || "PT0S"),
        viewCount: formatViews(item.statistics.viewCount || "0"),
      }));

      if (IDs) {
        setSearchedData(videos);
      } else {
        setTrendingResults(videos);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setError("Failed to fetch videos");
      setLoading(false);
    }
  };

  return { trendingResults, setTrendingResults, searchedData, loading, error, getVideos };
};

export default useFetchVideos;
