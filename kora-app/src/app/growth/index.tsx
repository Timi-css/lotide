import { useCallback, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';
import { Fab } from '../../components/Fab';
import { GrowthEntryRow } from '../../components/GrowthEntryRow';
import { PageHeader } from '../../components/PageHeader';
import { deleteGrowthEntry, getGrowthEntries } from '../../lib/growthStorage';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { GrowthEntry } from '../../types/growth';

export default function GrowthScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState<GrowthEntry[]>([]);
  const [pendingDelete, setPendingDelete] = useState<GrowthEntry | null>(null);

  useFocusEffect(
    useCallback(() => {
      getGrowthEntries().then(setEntries);
    }, [])
  );

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    await deleteGrowthEntry(pendingDelete.id);
    setPendingDelete(null);
    getGrowthEntries().then(setEntries);
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Growth" icon="chart-line" color={colors.homeTileGrowth} />
      {entries.length === 0 ? (
        <EmptyState
          icon="chart-line"
          title="No measurements yet"
          subtitle="Tap the button below to log a weight, height, or head circumference reading."
        />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <GrowthEntryRow
              entry={item}
              onEdit={() => router.push({ pathname: '/growth/add', params: { id: item.id } })}
              onDelete={() => setPendingDelete(item)}
            />
          )}
        />
      )}
      <Fab color={colors.homeTileGrowth} onPress={() => router.push('/growth/add')} />
      <ConfirmDialog
        visible={pendingDelete !== null}
        title="Delete this measurement?"
        message="This entry will be permanently removed."
        confirmLabel="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
});
