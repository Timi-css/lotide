import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PageHeader } from '../../components/PageHeader';
import { SegmentedControl } from '../../components/SegmentedControl';
import { addFeedEntry, getFeedEntries, updateFeedEntry } from '../../lib/feedStorage';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { radii, spacing } from '../../theme/spacing';
import type { FeedEntry, FeedType } from '../../types/feed';

const TYPE_OPTIONS: { label: string; value: FeedType }[] = [
  { label: 'Breast', value: 'breast' },
  { label: 'Bottle', value: 'bottle' },
  { label: 'Solid', value: 'solid' },
];

const SIDE_OPTIONS: { label: string; value: NonNullable<FeedEntry['side']> }[] = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Both', value: 'both' },
];

export default function AddFeedScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;

  const [type, setType] = useState<FeedType>('breast');
  const [side, setSide] = useState<NonNullable<FeedEntry['side']>>('left');
  const [durationMin, setDurationMin] = useState('');
  const [amountOz, setAmountOz] = useState('');
  const [notes, setNotes] = useState('');
  const [loggedAt, setLoggedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getFeedEntries().then((entries) => {
      const existing = entries.find((e) => e.id === id);
      if (!existing) return;
      setType(existing.type);
      setLoggedAt(existing.loggedAt);
      if (existing.side) setSide(existing.side);
      if (existing.durationMin) setDurationMin(String(existing.durationMin));
      if (existing.amountOz) setAmountOz(String(existing.amountOz));
      if (existing.notes) setNotes(existing.notes);
    });
  }, [id]);

  async function handleSave() {
    const payload = {
      type,
      loggedAt: loggedAt ?? new Date().toISOString(),
      ...(type === 'breast' ? { side, durationMin: Number(durationMin) || undefined } : {}),
      ...(type === 'bottle' ? { amountOz: Number(amountOz) || undefined } : {}),
      ...(type === 'solid' ? { notes: notes || undefined } : {}),
    };
    if (isEditing) {
      await updateFeedEntry(id, payload);
    } else {
      await addFeedEntry(payload);
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title={isEditing ? 'Edit Feed' : 'Log Feed'}
        icon="baby-bottle-outline"
        color={colors.homeTileFeed}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.fieldLabel}>Type</Text>
        <SegmentedControl options={TYPE_OPTIONS} value={type} onChange={setType} accentColor={colors.homeTileFeed} />

        {type === 'breast' && (
          <>
            <Text style={styles.fieldLabel}>Side</Text>
            <SegmentedControl
              options={SIDE_OPTIONS}
              value={side}
              onChange={setSide}
              accentColor={colors.homeTileFeed}
            />
            <Text style={styles.fieldLabel}>Duration (minutes)</Text>
            <TextInput
              style={styles.input}
              keyboardType="number-pad"
              value={durationMin}
              onChangeText={setDurationMin}
              placeholder="e.g. 15"
              placeholderTextColor={colors.navInactive}
            />
          </>
        )}

        {type === 'bottle' && (
          <>
            <Text style={styles.fieldLabel}>Amount (oz)</Text>
            <TextInput
              style={styles.input}
              keyboardType="decimal-pad"
              value={amountOz}
              onChangeText={setAmountOz}
              placeholder="e.g. 4"
              placeholderTextColor={colors.navInactive}
            />
          </>
        )}

        {type === 'solid' && (
          <>
            <Text style={styles.fieldLabel}>What did they eat?</Text>
            <TextInput
              style={styles.input}
              value={notes}
              onChangeText={setNotes}
              placeholder="e.g. Mashed banana"
              placeholderTextColor={colors.navInactive}
            />
          </>
        )}

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: colors.homeTileFeed, opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.saveButtonLabel}>{isEditing ? 'Save changes' : 'Log feed'}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  fieldLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.primaryTint,
  },
  saveButton: {
    marginTop: spacing.xl,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.surface,
  },
});
