import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radii, spacing } from '../theme/spacing';
import type { Appointment } from '../types/appointment';

function formatDateTime(iso: string) {
  const date = new Date(iso);
  const datePart = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  const timePart = date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${datePart} · ${timePart}`;
}

type AppointmentRowProps = {
  entry: Appointment;
  onEdit: () => void;
  onDelete: () => void;
};

export function AppointmentRow({ entry, onEdit, onDelete }: AppointmentRowProps) {
  return (
    <Pressable onPress={onEdit} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.85 : 1 }]}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name="calendar-clock" size={20} color={colors.homeTileAppointments} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.label}>{entry.title}</Text>
        {entry.notes ? <Text style={styles.detail}>{entry.notes}</Text> : null}
      </View>
      <Text style={styles.time}>{formatDateTime(entry.dateTime)}</Text>
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        hitSlop={8}
        style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      >
        <MaterialCommunityIcons name="trash-can-outline" size={18} color={colors.navInactive} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    gap: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.sm,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  detail: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  time: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
});
