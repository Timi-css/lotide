import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { HomeTile } from '../components/HomeTile';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { spacing } from '../theme/spacing';

const ROWS = [
  [
    { label: 'Feed', icon: 'baby-bottle-outline', color: colors.homeTileFeed, href: '/feed' } as const,
    { label: 'Diaper', icon: 'human-baby-changing-table', color: colors.homeTileDiaper, href: '/diaper' } as const,
  ],
  [
    { label: 'Growth', icon: 'chart-line', color: colors.homeTileGrowth, href: '/growth' } as const,
    {
      label: 'Appointments',
      icon: 'calendar-month',
      color: colors.homeTileAppointments,
      href: '/appointments',
    } as const,
  ],
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning</Text>
        <Text style={styles.title}>Kora</Text>
      </View>
      <View style={styles.grid}>
        {ROWS.map((row) => (
          <View key={row[0].label} style={styles.row}>
            {row.map((tile) => (
              <HomeTile
                key={tile.label}
                label={tile.label}
                icon={tile.icon}
                color={tile.color}
                onPress={() => router.push(tile.href)}
              />
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  greeting: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textSecondary,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.textPrimary,
  },
  grid: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.md,
  },
});
