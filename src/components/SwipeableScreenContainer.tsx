import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { PanResponder, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenContainer } from './ScreenContainer';

type SwipeableScreenContainerProps = {
  children: ReactNode;
};

const SWIPE_THRESHOLD = 60;
const SWIPE_VELOCITY = 0.3;

export const SwipeableScreenContainer = ({
  children,
}: SwipeableScreenContainerProps) => {
  const navigation = useNavigation();

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 12 &&
          Math.abs(gesture.dx) > Math.abs(gesture.dy) * 1.4,
        onPanResponderRelease: (_, gesture) => {
          const isSwipe =
            Math.abs(gesture.dx) > SWIPE_THRESHOLD ||
            Math.abs(gesture.vx) > SWIPE_VELOCITY;

          if (!isSwipe) return;

          const state = navigation.getState();
          const currentIndex = state.index ?? 0;
          const nextIndex =
            gesture.dx < 0
              ? Math.min(currentIndex + 1, state.routes.length - 1)
              : Math.max(currentIndex - 1, 0);

          if (nextIndex !== currentIndex) {
            const nextRoute = state.routes[nextIndex];
            navigation.navigate(nextRoute.name as never);
          }
        },
      }),
    [navigation]
  );

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      <ScreenContainer>{children}</ScreenContainer>
    </View>
  );
};
