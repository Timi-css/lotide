import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { PageHeader } from '../../components/PageHeader';
import { SegmentedControl } from '../../components/SegmentedControl';
import { addGrowthEntry, getGrowthEntries, updateGrowthEntry } from '../../lib/growthStorage';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { radii, spacing } from '../../theme/spacing';
import { GROWTH_UNIT, type GrowthType } from '../../types/growth';

const TYPE_OPTIONS: { label: string; value: GrowthType }[] = [
  { label: 'Weight', value: 'weight' },
  { label: 'Height', value: 'height' },
  { label: 'Head', value: 'head' },
];

export default function AddGrowthScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;

  const [type, setType] = useState<GrowthType>('weight');
  const [value, setValue] = useState('');
  const [loggedAt, setLoggedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getGrowthEntries().then((entries) => {
      const existing = entries.find((e) => e.id === id);
      if (!existing) return;
      setType(existing.type);
      setValue(String(existing.value));
      setLoggedAt(existing.loggedAt);
    });
  }, [id]);

  const isValid = Number(value) > 0;

  async function handleSave() {
    if (!isValid) return;
    const payload = {
      type,
      value: Number(value),
      loggedAt: loggedAt ?? new Date().toISOString(),
    };
    if (isEditing) {
      await updateGrowthEntry(id, payload);
    } else {
      await addGrowthEntry(payload);
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title={isEditing ? 'Edit Growth' : 'Log Growth'}
        icon="chart-line"
        color={colors.homeTileGrowth}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.fieldLabel}>Type</Text>
        <SegmentedControl
          options={TYPE_OPTIONS}
          value={type}
          onChange={setType}
          accentColor={colors.homeTileGrowth}
        />

        <Text style={styles.fieldLabel}>Value ({GROWTH_UNIT[type]})</Text>
        <TextInput
          style={styles.input}
          keyboardType="decimal-pad"
          value={value}
          onChangeText={setValue}
          placeholder={type === 'weight' ? 'e.g. 12.5' : 'e.g. 24'}
          placeholderTextColor={colors.navInactive}
        />

        <Pressable
          onPress={handleSave}
          disabled={!isValid}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: colors.homeTileGrowth, opacity: !isValid ? 0.4 : pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.saveButtonLabel}>{isEditing ? 'Save changes' : 'Log measurement'}</Text>
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
