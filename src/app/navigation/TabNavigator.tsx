import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ConfigScreen } from '../../features/countdown/screens/ConfigScreen';
import { CountdownListScreen } from '../../features/countdown/screens/CountdownListScreen';
import { TAB_BAR_BASE_HEIGHT } from '../../constants/layout';

export type RootTabParamList = {
  Configure: undefined;
  'Active Countdowns': undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

export const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: { color: '#1A1A1A', fontWeight: '600' },
        headerStyle: { backgroundColor: '#FFFFFF' },
        tabBarLabelStyle: { fontWeight: '600' },
        tabBarActiveTintColor: '#FF2D8D',
        tabBarInactiveTintColor: '#6B6B6B',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5EA',
          height: TAB_BAR_BASE_HEIGHT + Math.max(insets.bottom, 8),
        },
        tabBarContentContainerStyle: {
          paddingBottom: Math.max(insets.bottom, 8),
        },
        tabBarItemStyle: {
          paddingTop: 4,
          paddingBottom: 8,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#FF2D8D',
          height: 2,
          marginBottom: Math.max(insets.bottom, 8),
        },
        tabBarShowIcon: true,
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'Configure' ? 'time-outline' : 'list-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Configure" component={ConfigScreen} />
      <Tab.Screen name="Active Countdowns" component={CountdownListScreen} />
    </Tab.Navigator>
  );
};
