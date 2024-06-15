export interface TranscriptLine {
  text: string;
  duration: number;
  offset: number;
  lang?: string;
}

export type Transcript = TranscriptLine[];
