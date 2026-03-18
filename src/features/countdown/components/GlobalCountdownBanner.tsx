import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCountdownStore } from '../countdownStore';
import {
  calculateRemainingTime,
  getClosestCountdown,
} from '../../../utils/countdownUtils';
import { formatRemainingTime } from '../../../utils/dateUtils';

type GlobalCountdownBannerProps = {
  bottomOffset?: number;
};

export const GlobalCountdownBanner = ({
  bottomOffset = 0,
}: GlobalCountdownBannerProps) => {
  const countdowns = useCountdownStore((state) => state.countdowns);
  const now = useCountdownStore((state) => state.now);
  const closest = getClosestCountdown(countdowns, now);

  if (!closest) {
    return (
      <View style={[styles.dock, { bottom: bottomOffset }]}>
        <LinearGradient
          colors={['#FF2D8D', '#FF7A5C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.iconCircle}>
            <Ionicons name="star" size={18} color="#FF2D8D" />
          </View>
          <View style={styles.textStack}>
            <Text style={styles.kicker}>Closest timer</Text>
            <Text style={styles.label}>No active countdowns yet</Text>
          </View>
        </LinearGradient>
      </View>
    );
  }

  const remaining = calculateRemainingTime(closest.targetDate, now);

  return (
    <View style={[styles.dock, { bottom: bottomOffset }]}>
      <LinearGradient
        colors={['#FF2D8D', '#FF7A5C']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="star" size={18} color="#FF2D8D" />
        </View>
        <View style={styles.textStack}>
          <Text style={styles.kicker}>{closest.name}</Text>
          <Text style={styles.label}>Ends in</Text>
        </View>
        <View >
          <Text style={styles.timeText}>{formatRemainingTime(remaining)}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 5,
  },
  card: {
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStack: {
    flex: 1,
  },
  kicker: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontWeight: '700',
  },
});
