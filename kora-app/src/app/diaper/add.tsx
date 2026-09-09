import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PageHeader } from '../../components/PageHeader';
import { SegmentedControl } from '../../components/SegmentedControl';
import { addDiaperEntry, getDiaperEntries, updateDiaperEntry } from '../../lib/diaperStorage';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { radii, spacing } from '../../theme/spacing';
import type { DiaperType } from '../../types/diaper';

const TYPE_OPTIONS: { label: string; value: DiaperType }[] = [
  { label: 'Wet', value: 'wet' },
  { label: 'Dirty', value: 'dirty' },
  { label: 'Mixed', value: 'mixed' },
];

export default function AddDiaperScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;

  const [type, setType] = useState<DiaperType>('wet');
  const [notes, setNotes] = useState('');
  const [loggedAt, setLoggedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getDiaperEntries().then((entries) => {
      const existing = entries.find((e) => e.id === id);
      if (!existing) return;
      setType(existing.type);
      setLoggedAt(existing.loggedAt);
      if (existing.notes) setNotes(existing.notes);
    });
  }, [id]);

  async function handleSave() {
    const payload = {
      type,
      loggedAt: loggedAt ?? new Date().toISOString(),
      notes: notes || undefined,
    };
    if (isEditing) {
      await updateDiaperEntry(id, payload);
    } else {
      await addDiaperEntry(payload);
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title={isEditing ? 'Edit Diaper' : 'Log Diaper'}
        icon="human-baby-changing-table"
        color={colors.homeTileDiaper}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.fieldLabel}>Type</Text>
        <SegmentedControl
          options={TYPE_OPTIONS}
          value={type}
          onChange={setType}
          accentColor={colors.homeTileDiaper}
        />

        <Text style={styles.fieldLabel}>Notes (optional)</Text>
        <TextInput
          style={styles.input}
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g. Slight rash"
          placeholderTextColor={colors.navInactive}
        />

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: colors.homeTileDiaper, opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.saveButtonLabel}>{isEditing ? 'Save changes' : 'Log diaper'}</Text>
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
