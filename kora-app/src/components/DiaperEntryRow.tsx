import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radii, spacing } from '../theme/spacing';
import type { DiaperEntry } from '../types/diaper';

const TYPE_ICON: Record<DiaperEntry['type'], React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  wet: 'water-outline',
  dirty: 'emoticon-poop-outline',
  mixed: 'circle-half-full',
};

const TYPE_LABEL: Record<DiaperEntry['type'], string> = {
  wet: 'Wet',
  dirty: 'Dirty',
  mixed: 'Mixed',
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

type DiaperEntryRowProps = {
  entry: DiaperEntry;
  onEdit: () => void;
  onDelete: () => void;
};

export function DiaperEntryRow({ entry, onEdit, onDelete }: DiaperEntryRowProps) {
  return (
    <Pressable onPress={onEdit} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.85 : 1 }]}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name={TYPE_ICON[entry.type]} size={20} color={colors.homeTileDiaper} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.label}>{TYPE_LABEL[entry.type]}</Text>
        {entry.notes ? <Text style={styles.detail}>{entry.notes}</Text> : null}
      </View>
      <Text style={styles.time}>{formatTime(entry.loggedAt)}</Text>
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
