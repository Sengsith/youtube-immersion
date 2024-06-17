export interface TranscriptLine {
  text: string;
  duration: string;
  offset: string;
  lang?: string;
}

export type Transcript = TranscriptLine[];
