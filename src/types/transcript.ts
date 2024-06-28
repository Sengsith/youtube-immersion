export interface TranscriptLine {
  text: string;
  duration: string;
  offset: number;
  timestamp: string;
  lang?: string;
}

export type Transcript = TranscriptLine[];
