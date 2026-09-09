import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';

import { PageHeader } from '../../components/PageHeader';
import { addAppointment, getAppointments, updateAppointment } from '../../lib/appointmentStorage';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { radii, spacing } from '../../theme/spacing';

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function AddAppointmentScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const isEditing = !!id;

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  // Web fallback: @react-native-community/datetimepicker has no web implementation.
  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');

  // Native (iOS/Android): picker works directly against a Date value.
  const [dateTime, setDateTime] = useState(() => new Date());
  const [activePicker, setActivePicker] = useState<'date' | 'time' | null>(null);

  useEffect(() => {
    if (!id) return;
    getAppointments().then((entries) => {
      const existing = entries.find((e) => e.id === id);
      if (!existing) return;
      setTitle(existing.title);
      setNotes(existing.notes ?? '');
      const d = new Date(existing.dateTime);
      setDateTime(d);
      setDateText(`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
      setTimeText(`${pad(d.getHours())}:${pad(d.getMinutes())}`);
    });
  }, [id]);

  const isWeb = Platform.OS === 'web';

  const webDateTimeValid =
    DATE_PATTERN.test(dateText) &&
    TIME_PATTERN.test(timeText) &&
    !Number.isNaN(new Date(`${dateText}T${timeText}:00`).getTime());

  const isValid = title.trim().length > 0 && (isWeb ? webDateTimeValid : true);

  function handlePickerChange(event: DateTimePickerEvent, selected: Date | undefined) {
    // Android's picker is a self-dismissing dialog; iOS's spinner stays open until "Done" is tapped.
    if (Platform.OS === 'android') {
      setActivePicker(null);
      if (event.type !== 'set' || !selected) return;
    } else if (!selected) {
      return;
    }
    setDateTime((prev) => {
      const next = new Date(prev);
      if (activePicker === 'date') {
        next.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
      } else {
        next.setHours(selected.getHours(), selected.getMinutes());
      }
      return next;
    });
  }

  async function handleSave() {
    if (!isValid) return;
    const payload = {
      title: title.trim(),
      dateTime: isWeb ? new Date(`${dateText}T${timeText}:00`).toISOString() : dateTime.toISOString(),
      notes: notes || undefined,
    };
    if (isEditing) {
      await updateAppointment(id, payload);
    } else {
      await addAppointment(payload);
    }
    router.back();
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title={isEditing ? 'Edit Appointment' : 'Add Appointment'}
        icon="calendar-month"
        color={colors.homeTileAppointments}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.fieldLabel}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g. Pediatrician checkup"
          placeholderTextColor={colors.navInactive}
        />

        {isWeb ? (
          <>
            <Text style={styles.fieldLabel}>Date</Text>
            <TextInput
              style={styles.input}
              value={dateText}
              onChangeText={setDateText}
              placeholder="YYYY-MM-DD"
              placeholderTextColor={colors.navInactive}
            />

            <Text style={styles.fieldLabel}>Time</Text>
            <TextInput
              style={styles.input}
              value={timeText}
              onChangeText={setTimeText}
              placeholder="HH:MM (24h)"
              placeholderTextColor={colors.navInactive}
            />
          </>
        ) : (
          <>
            <Text style={styles.fieldLabel}>Date</Text>
            <Pressable style={styles.input} onPress={() => setActivePicker('date')}>
              <Text style={styles.pickerValue}>
                {dateTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </Text>
            </Pressable>

            <Text style={styles.fieldLabel}>Time</Text>
            <Pressable style={styles.input} onPress={() => setActivePicker('time')}>
              <Text style={styles.pickerValue}>
                {dateTime.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
              </Text>
            </Pressable>

            {activePicker && (
              <>
                <DateTimePicker
                  value={dateTime}
                  mode={activePicker}
                  display="default"
                  onChange={handlePickerChange}
                />
                {Platform.OS === 'ios' && (
                  <Pressable
                    onPress={() => setActivePicker(null)}
                    style={({ pressed }) => [styles.doneButton, { opacity: pressed ? 0.7 : 1 }]}
                  >
                    <Text style={styles.doneButtonLabel}>Done</Text>
                  </Pressable>
                )}
              </>
            )}
          </>
        )}

        <Text style={styles.fieldLabel}>Notes (optional)</Text>
        <TextInput
          style={styles.input}
          value={notes}
          onChangeText={setNotes}
          placeholder="e.g. Bring vaccination record"
          placeholderTextColor={colors.navInactive}
        />

        <Pressable
          onPress={handleSave}
          disabled={!isValid}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: colors.homeTileAppointments, opacity: !isValid ? 0.4 : pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.saveButtonLabel}>{isEditing ? 'Save changes' : 'Add appointment'}</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  fieldLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    padding: spacing.md,
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.primaryTint,
  },
  pickerValue: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textPrimary,
  },
  doneButton: {
    alignSelf: 'flex-end',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.sm,
    backgroundColor: colors.homeTileAppointments,
  },
  doneButtonLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
    color: colors.surface,
  },
  saveButton: {
    marginTop: spacing.xl,
    borderRadius: radii.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  saveButtonLabel: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.surface,
  },
});
