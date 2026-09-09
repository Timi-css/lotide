import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radii, spacing } from '../theme/spacing';
import { GROWTH_UNIT, type GrowthEntry } from '../types/growth';

const TYPE_ICON: Record<GrowthEntry['type'], React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  weight: 'scale-bathroom',
  height: 'human-male-height',
  head: 'head-outline',
};

const TYPE_LABEL: Record<GrowthEntry['type'], string> = {
  weight: 'Weight',
  height: 'Height',
  head: 'Head circumference',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

type GrowthEntryRowProps = {
  entry: GrowthEntry;
  onEdit: () => void;
  onDelete: () => void;
};

export function GrowthEntryRow({ entry, onEdit, onDelete }: GrowthEntryRowProps) {
  return (
    <Pressable onPress={onEdit} style={({ pressed }) => [styles.row, { opacity: pressed ? 0.85 : 1 }]}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name={TYPE_ICON[entry.type]} size={20} color={colors.homeTileGrowth} />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.label}>{TYPE_LABEL[entry.type]}</Text>
        <Text style={styles.detail}>
          {entry.value} {GROWTH_UNIT[entry.type]}
        </Text>
      </View>
      <Text style={styles.time}>{formatDate(entry.loggedAt)}</Text>
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
