module.exports = {
  preset: 'jest-expo',
  testMatch: ['**/src/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: [
    'node_modules/(?!(@react-native|react-native|react-native-gesture-handler|@react-navigation|expo|expo-modules-core|expo-status-bar)/)',
  ],
};
