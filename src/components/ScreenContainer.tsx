import type { ReactNode } from 'react';
import { SafeAreaView, StyleSheet, View, ViewStyle } from 'react-native';

type ScreenContainerProps = {
  children: ReactNode;
  style?: ViewStyle;
};

export const ScreenContainer = ({ children, style }: ScreenContainerProps) => (
  <SafeAreaView style={styles.safeArea}>
    <View style={[styles.container, style]}>{children}</View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  container: {
    flex: 1,
    padding: 0,
  },
});
