import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';

export const RootNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);
