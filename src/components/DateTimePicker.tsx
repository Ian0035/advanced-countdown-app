import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from './Button';

type DateTimePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  onSubmit?: () => void;
  loading?: boolean;
  successToken?: number;
  name?: string;
  onNameChange?: (value: string) => void;
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ITEM_HEIGHT = 40;
const VISIBLE_ITEMS = 5;

const buildCalendarMatrix = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks: Array<Array<number | null>> = [];
  let day = 1 - firstDay;

  while (day <= daysInMonth) {
    const week: Array<number | null> = [];
    for (let i = 0; i < 7; i += 1) {
      if (day < 1 || day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day);
      }
      day += 1;
    }
    weeks.push(week);
  }

  return weeks;
};

const getTimeParts = (date: Date) => ({
  hour: date.getHours(),
  minute: date.getMinutes(),
});

const isSameDay = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

type TimeColumnProps = {
  label: string;
  values: number[];
  selected: number;
  onSelect: (value: number) => void;
};

const TimeColumn = ({ label, values, selected, onSelect }: TimeColumnProps) => {
  const listRef = useRef<FlatList<number>>(null);
  const selectedIndex = useMemo(
    () => Math.max(values.indexOf(selected), 0),
    [selected, values]
  );

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollToIndex({ index: selectedIndex, animated: false });
  }, [selectedIndex]);

  return (
    <View style={styles.timeColumn}>
      <Text style={styles.timeLabel}>{label}</Text>
      <View style={styles.timeWheel}>
        <FlatList
          ref={listRef}
          data={values}
          keyExtractor={(item) => `${label}-${item}`}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.y / ITEM_HEIGHT
            );
            const nextValue = values[Math.min(Math.max(index, 0), values.length - 1)];
            onSelect(nextValue);
          }}
          onScrollToIndexFailed={() => {
            listRef.current?.scrollToIndex({ index: 0, animated: false });
          }}
          contentContainerStyle={styles.timeWheelContent}
          renderItem={({ item }) => (
            <View style={styles.timeItem}>
              <Text
                style={[
                  styles.timeItemText,
                  item === selected && styles.timeItemTextActive,
                ]}
              >
                {item.toString().padStart(2, '0')}
              </Text>
            </View>
          )}
        />
        <View pointerEvents="none" style={styles.timeSelectionOverlay} />
      </View>
    </View>
  );
};

export const DateTimePickerField = ({
  value,
  onChange,
  onSubmit,
  loading = false,
  successToken,
  name = '',
  onNameChange,
}: DateTimePickerProps) => {
  const [step, setStep] = useState<'date' | 'time'>('date');
  const transition = useRef(new Animated.Value(0)).current;
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cursorMonth, setCursorMonth] = useState(
    new Date(value.getFullYear(), value.getMonth(), 1)
  );
  const { hour, minute } = getTimeParts(value);
  const now = new Date();
  const isTodaySelected = isSameDay(value, now);
  const minHour = isTodaySelected ? now.getHours() : 0;
  const minMinute = isTodaySelected && hour === minHour ? now.getMinutes() : 0;
  const hourValues = useMemo(
    () =>
      Array.from({ length: 24 - minHour }, (_, index) => index + minHour),
    [minHour]
  );
  const minuteValues = useMemo(
    () =>
      Array.from({ length: 60 - minMinute }, (_, index) => index + minMinute),
    [minMinute]
  );
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  useEffect(() => {
    setCursorMonth(new Date(value.getFullYear(), value.getMonth(), 1));
  }, [value]);

  useEffect(() => {
    setIsTransitioning(true);
    transition.setValue(0);
    Animated.timing(transition, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setIsTransitioning(false));
  }, [step, transition]);

  useEffect(() => {
    if (!successToken) return;
    const switchStep = setTimeout(() => setStep('date'), 250);
    return () => {
      clearTimeout(switchStep);
    };
  }, [successToken]);

  useEffect(() => {
    if (step !== 'time' || !isTodaySelected) return;
    if (hour < minHour || (hour === minHour && minute < minMinute)) {
      const next = new Date(value);
      next.setHours(minHour, minMinute, 0, 0);
      onChange(next);
    }
  }, [step, isTodaySelected, hour, minute, minHour, minMinute, onChange, value]);

  const calendarWeeks = useMemo(
    () =>
      buildCalendarMatrix(
        cursorMonth.getFullYear(),
        cursorMonth.getMonth()
      ),
    [cursorMonth]
  );

  const clampToNowIfToday = (date: Date) => {
    if (!isSameDay(date, now)) return date;
    const next = new Date(date);
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    if (next.getHours() < currentHour) {
      next.setHours(currentHour, currentMinute, 0, 0);
      return next;
    }
    if (next.getHours() === currentHour && next.getMinutes() < currentMinute) {
      next.setMinutes(currentMinute, 0, 0);
      return next;
    }
    return date;
  };

  const handleSelectDay = (day: number) => {
    const next = new Date(value);
    next.setFullYear(cursorMonth.getFullYear(), cursorMonth.getMonth(), day);
    next.setSeconds(0, 0);
    if (next.getTime() < today.getTime()) return;
    onChange(clampToNowIfToday(next));
    setStep('time');
  };

  const handleSelectHour = (nextHour: number) => {
    const next = new Date(value);
    next.setHours(nextHour, value.getMinutes(), 0, 0);
    onChange(clampToNowIfToday(next));
  };

  const handleSelectMinute = (nextMinute: number) => {
    const next = new Date(value);
    next.setMinutes(nextMinute, 0, 0);
    onChange(clampToNowIfToday(next));
  };

  const isPastMonth =
    cursorMonth.getFullYear() < today.getFullYear() ||
    (cursorMonth.getFullYear() === today.getFullYear() &&
      cursorMonth.getMonth() < today.getMonth());

  const isSameMonthAsToday =
    cursorMonth.getFullYear() === today.getFullYear() &&
    cursorMonth.getMonth() === today.getMonth();

  return (
    <View style={styles.wrapper}>
      <View style={styles.stage}>
        <Animated.View
          pointerEvents={isTransitioning ? 'none' : step === 'date' ? 'auto' : 'none'}
          style={[
            styles.animatedPane,
            {
              opacity: step === 'date' ? 1 : 0,
              transform: [
                {
                  translateY:
                    step === 'date'
                      ? transition.interpolate({
                          inputRange: [0, 1],
                          outputRange: [8, 0],
                        })
                      : 0,
                },
              ],
            },
          ]}
        >
          <Text style={styles.label}>Pick date</Text>
          <View
            style={[
              styles.calendarCard,
              isTransitioning && styles.cardShadowSuppressed,
            ]}
          >
            <View style={styles.calendarHeader}>
              <Pressable
                onPress={() =>
                  setCursorMonth(
                    new Date(
                      cursorMonth.getFullYear(),
                      cursorMonth.getMonth() - 1,
                      1
                    )
                  )
                }
                disabled={isPastMonth}
                style={({ pressed }) => [
                  styles.monthButton,
                  pressed && styles.monthButtonPressed,
                  isPastMonth && styles.monthButtonDisabled,
                ]}
              >
                <Text style={styles.monthButtonText}>Prev</Text>
              </Pressable>
              <Text style={styles.monthTitle}>
                {MONTHS[cursorMonth.getMonth()]} {cursorMonth.getFullYear()}
              </Text>
              <Pressable
                onPress={() =>
                  setCursorMonth(
                    new Date(
                      cursorMonth.getFullYear(),
                      cursorMonth.getMonth() + 1,
                      1
                    )
                  )
                }
                style={({ pressed }) => [
                  styles.monthButton,
                  pressed && styles.monthButtonPressed,
                ]}
              >
                <Text style={styles.monthButtonText}>Next</Text>
              </Pressable>
            </View>

            <View style={styles.weekRow}>
              {WEEK_DAYS.map((dayLabel) => (
                <Text key={dayLabel} style={styles.weekLabel}>
                  {dayLabel}
                </Text>
              ))}
            </View>

            {calendarWeeks.map((week, weekIndex) => (
              <View key={`week-${weekIndex}`} style={styles.weekRow}>
                {week.map((day, dayIndex) => {
                  const isSelected =
                    day !== null &&
                    value.getFullYear() === cursorMonth.getFullYear() &&
                    value.getMonth() === cursorMonth.getMonth() &&
                    value.getDate() === day;

                  const isPastDay =
                    day !== null &&
                    isSameMonthAsToday &&
                    day < today.getDate();

                  const isDisabled = day === null || isPastMonth || isPastDay;

                  return (
                    <Pressable
                      key={`day-${weekIndex}-${dayIndex}`}
                      disabled={isDisabled}
                      onPress={() => day && handleSelectDay(day)}
                      style={({ pressed }) => [
                        styles.dayCell,
                        isDisabled && styles.dayCellDisabled,
                        isSelected && styles.dayCellSelected,
                        pressed && !isDisabled && styles.dayCellPressed,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isSelected && styles.dayTextSelected,
                          isDisabled && styles.dayTextDisabled,
                        ]}
                      >
                        {day ?? ''}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </Animated.View>

        <Animated.View
          pointerEvents={isTransitioning ? 'none' : step === 'time' ? 'auto' : 'none'}
          style={[
            styles.animatedPane,
            {
              opacity: step === 'time' ? 1 : 0,
              transform: [
                {
                  translateY:
                    step === 'time'
                      ? transition.interpolate({
                          inputRange: [0, 1],
                          outputRange: [8, 0],
                        })
                      : 0,
                },
              ],
            },
          ]}
        >
          <View style={styles.timeHeaderRow}>
            <Text style={styles.label}>Pick time</Text>
            <Pressable
              onPress={() => setStep('date')}
              style={({ pressed }) => [
                styles.changeButton,
                pressed && styles.changeButtonPressed,
              ]}
            >
              <Text style={styles.changeButtonText}>Change date</Text>
            </Pressable>
          </View>
          <TextInput
            value={name}
            onChangeText={(value) => onNameChange?.(value)}
            placeholder="Countdown name (optional)"
            placeholderTextColor="#9CA3AF"
            style={styles.nameInput}
          />
          <View
            style={[
              styles.timeCard,
              isTransitioning && styles.cardShadowSuppressed,
            ]}
          >
            <TimeColumn
              label="Hours"
              values={hourValues}
              selected={hour}
              onSelect={handleSelectHour}
            />
            <TimeColumn
              label="Minutes"
              values={minuteValues}
              selected={minute}
              onSelect={handleSelectMinute}
            />
          </View>
          <View style={styles.saveRow}>
            <Button
              label={loading ? 'Starting...' : 'Start'}
              onPress={() => {
                onSubmit?.();
              }}
              disabled={loading}
            />
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 8,
    position: 'relative',
  },
  stage: {
    position: 'relative',
    minHeight: 360,
  },
  animatedPane: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  timeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  calendarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  monthButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#F2F2F2',
  },
  monthButtonPressed: {
    backgroundColor: '#E5E5EA',
  },
  monthButtonDisabled: {
    opacity: 0.4,
  },
  monthButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weekLabel: {
    width: 36,
    textAlign: 'center',
    fontSize: 11,
    color: '#6B6B6B',
    marginBottom: 6,
  },
  dayCell: {
    width: 36,
    height: 36,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  dayCellPressed: {
    backgroundColor: '#FFD1E4',
  },
  dayCellSelected: {
    backgroundColor: '#FF2D8D',
  },
  dayCellDisabled: {
    opacity: 0.2,
  },
  dayText: {
    fontSize: 13,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  dayTextSelected: {
    color: '#ffffff',
  },
  dayTextDisabled: {
    color: '#6B6B6B',
  },
  timeCard: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  timeColumn: {
    flex: 1,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B6B6B',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  timeWheel: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#F5F5F7',
    overflow: 'hidden',
  },
  timeWheelContent: {
    paddingVertical: ITEM_HEIGHT * 2,
  },
  timeItem: {
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B6B6B',
  },
  timeItemTextActive: {
    color: '#1A1A1A',
    fontSize: 18,
  },
  timeSelectionOverlay: {
    position: 'absolute',
    top: ITEM_HEIGHT * 2,
    left: 8,
    right: 8,
    height: ITEM_HEIGHT,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF2D8D',
    backgroundColor: 'rgba(255, 45, 141, 0.12)',
  },
  changeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: '#eaeaea',
  },
  changeButtonPressed: {
    backgroundColor: '#E5E5EA',
  },
  changeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  saveRow: {
    marginTop: 16,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 12,
  },
  cardShadowSuppressed: {
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 0,
    borderColor: 'transparent',
  },
});
