import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCountdownStore } from '../features/countdown/countdownStore';

const AUTO_HIDE_MS = 2200;
const DISMISS_DRAG = 24;

export const GlobalToast = () => {
  const insets = useSafeAreaInsets();
  const toastMessage = useCountdownStore((state) => state.toastMessage);
  const toastToken = useCountdownStore((state) => state.toastToken);
  const clearToast = useCountdownStore((state) => state.clearToast);
  const translateY = useRef(new Animated.Value(-18)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [visible, setVisible] = useState(false);

  const topOffset = useMemo(() => Math.max(insets.top + 14, 16), [insets.top]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -18,
        duration: 180,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      clearToast();
    });
  };

  useEffect(() => {
    if (!toastToken || !toastMessage) return;
    setVisible(true);
    translateY.setValue(-18);
    opacity.setValue(0);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(hideToast, AUTO_HIDE_MS);
    return () => clearTimeout(timer);
  }, [toastToken, toastMessage]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dy) > 4,
        onPanResponderMove: (_, gesture) => {
          if (gesture.dy < 0) {
            translateY.setValue(gesture.dy);
          }
        },
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dy < -DISMISS_DRAG || gesture.vy < -0.6) {
            hideToast();
            return;
          }
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        },
      }),
    [translateY]
  );

  if (!visible || !toastMessage) return null;

  return (
    <View pointerEvents="box-none" style={styles.overlay}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.toast,
          {
            top: topOffset,
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <Text style={styles.toastText}>{toastMessage}</Text>
        <Text style={styles.toastHint}>Swipe up to dismiss</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 20,
    pointerEvents: 'box-none',
  },
  toast: {
    position: 'absolute',
    left: 16,
    right: 16,
    backgroundColor: '#34C759',
    borderColor: '#2FB250',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    shadowColor: '#0f172a',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  toastHint: {
    marginTop: 4,
    color: '#E6F8EC',
    fontSize: 10,
    textAlign: 'center',
  },
});
