/** A YouTube video reference for a weekly theme. */
export interface VideoReference {
  creator: string;
  title: string;
  url?: string;
}

/** A single ranked Bitcoin theme for the week. */
export interface WeeklyTheme {
  rank: 1 | 2 | 3;
  title: string;
  summary: string;
  rankingReason: string;
  references: VideoReference[];
  imageUrl?: string;
  imagePrompt?: string;
}

/** Full weekly pulse report. */
export interface WeeklyPulse {
  id: string;
  weekLabel: string;
  dateRange: string;
  generatedAt: string;
  status: 'pending' | 'generated' | 'publishing' | 'published';
  publishedThemeRank?: 1 | 2 | 3;
  publishedEventId?: string;
  themes: WeeklyTheme[];
  limitations?: string[];
}
