import AsyncStorage from '@react-native-async-storage/async-storage';

import type { FeedEntry } from '../types/feed';

const STORAGE_KEY = 'kora:feed-entries';

export async function getFeedEntries(): Promise<FeedEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const entries: FeedEntry[] = JSON.parse(raw);
  return entries.sort((a, b) => b.loggedAt.localeCompare(a.loggedAt));
}

export async function addFeedEntry(entry: Omit<FeedEntry, 'id'>): Promise<void> {
  const entries = await getFeedEntries();
  const newEntry: FeedEntry = { ...entry, id: `${Date.now()}` };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...entries]));
}

export async function updateFeedEntry(id: string, patch: Omit<FeedEntry, 'id'>): Promise<void> {
  const entries = await getFeedEntries();
  const updated = entries.map((e) => (e.id === id ? { ...patch, id } : e));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteFeedEntry(id: string): Promise<void> {
  const entries = await getFeedEntries();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries.filter((e) => e.id !== id)));
}
