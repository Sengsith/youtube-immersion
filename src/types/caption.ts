export interface Caption {
  id: string;
  language: string;
  trackKind: "standard" | "auto-generated" | "unknown";
  lines: [
    {
      start: string;
      end: string;
      text: string;
    }
  ];
}
