import { useCallback, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';
import { Fab } from '../../components/Fab';
import { FeedEntryRow } from '../../components/FeedEntryRow';
import { PageHeader } from '../../components/PageHeader';
import { deleteFeedEntry, getFeedEntries } from '../../lib/feedStorage';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { FeedEntry } from '../../types/feed';

export default function FeedScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState<FeedEntry[]>([]);
  const [pendingDelete, setPendingDelete] = useState<FeedEntry | null>(null);

  useFocusEffect(
    useCallback(() => {
      getFeedEntries().then(setEntries);
    }, [])
  );

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    await deleteFeedEntry(pendingDelete.id);
    setPendingDelete(null);
    getFeedEntries().then(setEntries);
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Feed" icon="baby-bottle-outline" color={colors.homeTileFeed} />
      {entries.length === 0 ? (
        <EmptyState
          icon="baby-bottle-outline"
          title="No feeds logged yet"
          subtitle="Tap the button below to log a bottle or nursing session."
        />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <FeedEntryRow
              entry={item}
              onEdit={() => router.push({ pathname: '/feed/add', params: { id: item.id } })}
              onDelete={() => setPendingDelete(item)}
            />
          )}
        />
      )}
      <Fab color={colors.homeTileFeed} onPress={() => router.push('/feed/add')} />
      <ConfirmDialog
        visible={pendingDelete !== null}
        title="Delete this feed?"
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
