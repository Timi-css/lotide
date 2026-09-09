export type FeedType = 'breast' | 'bottle' | 'solid';

export type FeedEntry = {
  id: string;
  type: FeedType;
  loggedAt: string;
  side?: 'left' | 'right' | 'both';
  durationMin?: number;
  amountOz?: number;
  notes?: string;
};
