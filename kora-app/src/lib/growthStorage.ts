import AsyncStorage from '@react-native-async-storage/async-storage';

import type { GrowthEntry } from '../types/growth';

const STORAGE_KEY = 'kora:growth-entries';

export async function getGrowthEntries(): Promise<GrowthEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const entries: GrowthEntry[] = JSON.parse(raw);
  return entries.sort((a, b) => b.loggedAt.localeCompare(a.loggedAt));
}

export async function addGrowthEntry(entry: Omit<GrowthEntry, 'id'>): Promise<void> {
  const entries = await getGrowthEntries();
  const newEntry: GrowthEntry = { ...entry, id: `${Date.now()}` };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...entries]));
}

export async function updateGrowthEntry(id: string, patch: Omit<GrowthEntry, 'id'>): Promise<void> {
  const entries = await getGrowthEntries();
  const updated = entries.map((e) => (e.id === id ? { ...patch, id } : e));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteGrowthEntry(id: string): Promise<void> {
  const entries = await getGrowthEntries();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries.filter((e) => e.id !== id)));
}
