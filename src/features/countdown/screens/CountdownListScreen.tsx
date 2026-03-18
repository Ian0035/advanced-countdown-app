import { Animated, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../../../components/ScreenContainer';
import { CountdownRow } from '../components/CountdownRow';
import { useCountdownStore } from '../countdownStore';
import { BOTTOM_BANNER_HEIGHT } from '../../../constants/layout';

export const CountdownListScreen = () => {
  const countdowns = useCountdownStore((state) => state.countdowns);
  const removeCountdown = useCountdownStore((state) => state.removeCountdown);
  const sortedCountdowns = [...countdowns].sort(
    (a, b) => a.targetDate.getTime() - b.targetDate.getTime()
  );
  const showSwipeHint = sortedCountdowns.length > 0;

  const renderRightActions = (
    _: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>,
    onRemove: () => void
  ) => {
    const translateX = dragX.interpolate({
      inputRange: [-140, -60, 0],
      outputRange: [0, 0, 90],
      extrapolate: 'clamp',
    });

    return (
      <RectButton onPress={onRemove} style={styles.deleteAction}>
        <View style={styles.deleteSolid}>
          <Animated.View style={[styles.deleteContent, { transform: [{ translateX }] }]}>
            <Ionicons name="trash-outline" size={18} color="#FFFFFF" />
            <Text style={styles.deleteText}>Delete</Text>
          </Animated.View>
        </View>
      </RectButton>
    );
  };

  return (
    <ScreenContainer>
      <LinearGradient
        colors={['#FF7A5C', '#FF5B7A', '#FF2D8D']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerCard}
      >
        <Text style={styles.title}>Active Countdowns</Text>
      </LinearGradient>
      <FlatList
        data={sortedCountdowns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={(progress, dragX) =>
              renderRightActions(progress, dragX, () => removeCountdown(item.id))
            }
            rightThreshold={40}
            overshootRight={false}
          >
            <CountdownRow countdown={item} />
          </Swipeable>
        )}
        ListHeaderComponent={
          showSwipeHint ? (
            <View style={styles.hintWrapper}>
              <LinearGradient
                colors={['#FF2D8D', '#FF7A5C']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.hintCard}
              >
                <View style={styles.hintGlow} />
                <View style={styles.hintRow}>
                  <View style={styles.hintIcon}>
                    <Ionicons name="swap-horizontal" size={18} color="#FF2D8D" />
                  </View>
                  <Text style={styles.hintText}>
                    Swipe left to delete a countdown
                  </Text>
                </View>
              </LinearGradient>
            </View>
          ) : null
        }
        contentContainerStyle={
          sortedCountdowns.length === 0
            ? [styles.emptyContainer, styles.listPadding]
            : [styles.list, styles.listPadding]
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <LinearGradient
              colors={['#FF2D8D', '#FF7A5C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.emptyTicket}
            >
              <View style={styles.ticketNotchLeft} />
              <View style={styles.ticketNotchRight} />
              <Text style={styles.ticketValue}>No Active Countdowns Yet</Text>
            </LinearGradient>
          </View>
        }
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  listPadding: {
    paddingHorizontal: 16,
    paddingBottom: 16 + BOTTOM_BANNER_HEIGHT,
  },
  hintWrapper: {
    marginBottom: 12,
  },
  hintCard: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    overflow: 'hidden',
  },
  hintGlow: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  hintIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  list: {
    paddingVertical: 4,
  },
  separator: {
    height: 12,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyTicket: {
    width: 180,
    height: 100,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  ticketNotchLeft: {
    position: 'absolute',
    left: -10,
    top: '50%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F5F5F7',
  },
  ticketNotchRight: {
    position: 'absolute',
    right: -10,
    top: '50%',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#F5F5F7',
  },
  ticketValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  deleteAction: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  deleteSolid: {
    width: 86,
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef4444',
  },
  deleteContent: {
    alignItems: 'center',
    gap: 4,
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
