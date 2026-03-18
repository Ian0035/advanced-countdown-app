import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { Countdown } from '../../../types/countdown';
import { useCountdownStore } from '../countdownStore';
import { calculateRemainingTime } from '../../../utils/countdownUtils';
import { formatRemainingTime } from '../../../utils/dateUtils';

type CountdownRowProps = {
  countdown: Countdown;
};

export const CountdownRow = ({ countdown }: CountdownRowProps) => {
  const now = useCountdownStore((state) => state.now);
  const remaining = calculateRemainingTime(countdown.targetDate, now);

  return (
    <View style={styles.row}>
      <LinearGradient
        colors={['#FF2D8D', '#FF7A5C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.accent}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{countdown.name}</Text>
        <Text style={styles.subtitle}>
          Ends {countdown.targetDate.toLocaleString()}
        </Text>
      </View>
      <View style={styles.rightColumn}>
        <View style={styles.timeStack}>
          <Text style={styles.timeLabel}>Remaining</Text>
          <Text style={styles.timeValue}>
            {formatRemainingTime(remaining)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    overflow: 'hidden',
  },
  accent: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 6,
  },
  content: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: 4,
  },
  timeStack: {
    alignItems: 'flex-end',
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B6B6B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  timeValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1A1A1A',
    marginTop: 4,
  },
});
