export type GrowthType = 'weight' | 'height' | 'head';

export const GROWTH_UNIT: Record<GrowthType, string> = {
  weight: 'lb',
  height: 'in',
  head: 'in',
};

export type GrowthEntry = {
  id: string;
  type: GrowthType;
  value: number;
  loggedAt: string;
};
