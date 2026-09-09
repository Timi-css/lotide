import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radii, spacing } from '../theme/spacing';
import type { FeedEntry } from '../types/feed';

const TYPE_ICON: Record<FeedEntry['type'], React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  breast: 'human-female',
  bottle: 'baby-bottle-outline',
  solid: 'food-apple',
};

const TYPE_LABEL: Record<FeedEntry['type'], string> = {
  breast: 'Breastfeeding',
  bottle: 'Bottle',
  solid: 'Solid food',
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

function formatDetail(entry: FeedEntry) {
  if (entry.type === 'breast') {
    const side = entry.side ? `${entry.side.charAt(0).toUpperCase()}${entry.side.slice(1)} side` : null;
    const duration = entry.durationMin ? `${entry.durationMin} min` : null;
    return [side, duration].filter(Boolean).join(' · ') || undefined;
  }
  if (entry.type === 'bottle') {
    return entry.amountOz ? `${entry.amountOz} oz` : undefined;
  }
  return entry.notes || undefined;
}

type FeedEntryRowProps = {
  entry: FeedEntry;
  onEdit: () => void;
  onDelete: () => void;
};

export function FeedEntryRow({ entry, onEdit, onDelete }: FeedEntryRowProps) {
  const detail = formatDetail(entry);

  return (
    <Pressable onPress={onEdit} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.85 : 1 }]}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name={TYPE_ICON[entry.type]} size={20} color={colors.homeTileFeed} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.label}>{TYPE_LABEL[entry.type]}</Text>
        {detail ? <Text style={styles.detail}>{detail}</Text> : null}
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
