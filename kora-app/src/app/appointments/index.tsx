import { useCallback, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { AppointmentRow } from '../../components/AppointmentRow';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { EmptyState } from '../../components/EmptyState';
import { Fab } from '../../components/Fab';
import { PageHeader } from '../../components/PageHeader';
import { deleteAppointment, getAppointments } from '../../lib/appointmentStorage';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { Appointment } from '../../types/appointment';

export default function AppointmentsScreen() {
  const router = useRouter();
  const [entries, setEntries] = useState<Appointment[]>([]);
  const [pendingDelete, setPendingDelete] = useState<Appointment | null>(null);

  useFocusEffect(
    useCallback(() => {
      getAppointments().then(setEntries);
    }, [])
  );

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    await deleteAppointment(pendingDelete.id);
    setPendingDelete(null);
    getAppointments().then(setEntries);
  }

  return (
    <View style={styles.container}>
      <PageHeader title="Appointments" icon="calendar-month" color={colors.homeTileAppointments} />
      {entries.length === 0 ? (
        <EmptyState
          icon="calendar-month"
          title="No appointments scheduled"
          subtitle="Tap the button below to add an upcoming appointment."
        />
      ) : (
        <FlatList
          data={entries}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <AppointmentRow
              entry={item}
              onEdit={() => router.push({ pathname: '/appointments/add', params: { id: item.id } })}
              onDelete={() => setPendingDelete(item)}
            />
          )}
        />
      )}
      <Fab color={colors.homeTileAppointments} onPress={() => router.push('/appointments/add')} />
      <ConfirmDialog
        visible={pendingDelete !== null}
        title="Delete this appointment?"
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
