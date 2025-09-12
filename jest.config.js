module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-paper|@react-native-async-storage)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: ['**/__tests__/**/*.(ts|tsx|js|jsx)', '**/*.(test|spec).(ts|tsx|js|jsx)'],
  testEnvironment: 'node',
};
