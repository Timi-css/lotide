import AsyncStorage from '@react-native-async-storage/async-storage';

import type { DiaperEntry } from '../types/diaper';

const STORAGE_KEY = 'kora:diaper-entries';

export async function getDiaperEntries(): Promise<DiaperEntry[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const entries: DiaperEntry[] = JSON.parse(raw);
  return entries.sort((a, b) => b.loggedAt.localeCompare(a.loggedAt));
}

export async function addDiaperEntry(entry: Omit<DiaperEntry, 'id'>): Promise<void> {
  const entries = await getDiaperEntries();
  const newEntry: DiaperEntry = { ...entry, id: `${Date.now()}` };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...entries]));
}

export async function updateDiaperEntry(id: string, patch: Omit<DiaperEntry, 'id'>): Promise<void> {
  const entries = await getDiaperEntries();
  const updated = entries.map((e) => (e.id === id ? { ...patch, id } : e));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteDiaperEntry(id: string): Promise<void> {
  const entries = await getDiaperEntries();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries.filter((e) => e.id !== id)));
}
