import AsyncStorage from '@react-native-async-storage/async-storage';

import type { Appointment } from '../types/appointment';

const STORAGE_KEY = 'kora:appointments';

export async function getAppointments(): Promise<Appointment[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const entries: Appointment[] = JSON.parse(raw);
  return entries.sort((a, b) => a.dateTime.localeCompare(b.dateTime));
}

export async function addAppointment(entry: Omit<Appointment, 'id'>): Promise<void> {
  const entries = await getAppointments();
  const newEntry: Appointment = { ...entry, id: `${Date.now()}` };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...entries]));
}

export async function updateAppointment(id: string, patch: Omit<Appointment, 'id'>): Promise<void> {
  const entries = await getAppointments();
  const updated = entries.map((e) => (e.id === id ? { ...patch, id } : e));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export async function deleteAppointment(id: string): Promise<void> {
  const entries = await getAppointments();
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(entries.filter((e) => e.id !== id)));
}
