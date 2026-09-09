export type DiaperType = 'wet' | 'dirty' | 'mixed';

export type DiaperEntry = {
  id: string;
  type: DiaperType;
  loggedAt: string;
  notes?: string;
};
