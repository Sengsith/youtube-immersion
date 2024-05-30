export interface Video {
  id: string;
  publishedAt: Date;
  title: string;
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  channelTitle: string;
  duration: string;
  viewCount: number;
}
