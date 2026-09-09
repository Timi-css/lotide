import { useCallback, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { ConfirmDialog } from '../../components/ConfirmDialog';
import { DiaperEntryRow } from '../../components/DiaperEntryRow';
import { EmptyState } from '../../components/EmptyState';
import { Fab } from '../../components/Fab';
import { PageHeader } from '../../components/PageHeader';
import { deleteDiaperEntry, getDiaperEntries } from '../../lib/diaperStorage';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { DiaperEntry } from '../../types/diaper';

export default function DiaperScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState<DiaperEntry[]>([]);
  const [pendingDelete, setPendingDelete] = useState<DiaperEntry | null>(null);

  useFocusEffect(
    useCallback(() => {
      getDiaperEntries().then(setEntries);
    }, [])
  );

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    await deleteDiaperEntry(pendingDelete.id);
    setPendingDelete(null);
    getDiaperEntries().then(setEntries);
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Diaper" icon="human-baby-changing-table" color={colors.homeTileDiaper} />
      {entries.length === 0 ? (
        <EmptyState
          icon="human-baby-changing-table"
          title="No changes logged yet"
          subtitle="Tap the button below to log a diaper change."
        />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <DiaperEntryRow
              entry={item}
              onEdit={() => router.push({ pathname: '/diaper/add', params: { id: item.id } })}
              onDelete={() => setPendingDelete(item)}
            />
          )}
        />
      )}
      <Fab color={colors.homeTileDiaper} onPress={() => router.push('/diaper/add')} />
      <ConfirmDialog
        visible={pendingDelete !== null}
        title="Delete this diaper change?"
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
