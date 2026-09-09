import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { radii, spacing } from '../theme/spacing';

type HomeTileProps = {
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  onPress?: () => void;
};

export function HomeTile({ label, icon, color, onPress }: HomeTileProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        { backgroundColor: color, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name={icon} size={28} color={colors.surface} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    borderRadius: radii.lg,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.md,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    color: colors.surface,
  },
});
