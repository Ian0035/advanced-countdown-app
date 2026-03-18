import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './navigation/RootNavigator';
import { GlobalCountdownBanner } from '../features/countdown/components/GlobalCountdownBanner';
import { useCountdownTimer } from '../features/countdown/hooks/useCountdownTimer';
import { GlobalSuccessOverlay } from '../components/GlobalSuccessOverlay';
import { TAB_BAR_BASE_HEIGHT, BOTTOM_BANNER_GAP } from '../constants/layout';

enableScreens();

const AppContent = () => {
  useCountdownTimer();
  const insets = useSafeAreaInsets();
  const tabBarHeight = TAB_BAR_BASE_HEIGHT + Math.max(insets.bottom, 8);

  return (
    <View style={styles.container}>
      <View style={[styles.logoBar, { paddingTop: insets.top + 8 }]}>
        <Image
          source={require('../../assets/loofers.png')}
          style={styles.logo}
          resizeMode="contain"
          accessibilityLabel="Loofers"
        />
      </View>
      <RootNavigator />
      <GlobalCountdownBanner bottomOffset={tabBarHeight + BOTTOM_BANNER_GAP} />
      <GlobalSuccessOverlay />
      <StatusBar style="light" />
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.gestureRoot}>
        <AppContent />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  logoBar: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 6,
  },
  logo: {
    height: 32,
    width: 160,
  },
  gestureRoot: {
    flex: 1,
  },
});
