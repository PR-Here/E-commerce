import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6366F1',
    primaryContainer: '#E0E7FF',
    secondary: '#10B981',
    secondaryContainer: '#D1FAE5',
    surface: '#FFFFFF',
    surfaceVariant: '#F8FAFC',
    background: '#F8FAFC',
    error: '#EF4444',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#1F2937',
    onBackground: '#1F2937',
    onError: '#FFFFFF',
  },
  roundness: 12,
  fonts: {
    ...MD3LightTheme.fonts,
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontFamily: 'Inter_700Bold',
    },
    headlineMedium: {
      ...MD3LightTheme.fonts.headlineMedium,
      fontFamily: 'Inter_600SemiBold',
    },
    headlineSmall: {
      ...MD3LightTheme.fonts.headlineSmall,
      fontFamily: 'Inter_600SemiBold',
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontFamily: 'Inter_600SemiBold',
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontFamily: 'Inter_500Medium',
    },
    titleSmall: {
      ...MD3LightTheme.fonts.titleSmall,
      fontFamily: 'Inter_500Medium',
    },
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: 'Inter_400Regular',
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontFamily: 'Inter_400Regular',
    },
    bodySmall: {
      ...MD3LightTheme.fonts.bodySmall,
      fontFamily: 'Inter_400Regular',
    },
    labelLarge: {
      ...MD3LightTheme.fonts.labelLarge,
      fontFamily: 'Inter_500Medium',
    },
    labelMedium: {
      ...MD3LightTheme.fonts.labelMedium,
      fontFamily: 'Inter_500Medium',
    },
    labelSmall: {
      ...MD3LightTheme.fonts.labelSmall,
      fontFamily: 'Inter_500Medium',
    },
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#BB86FC',
    primaryContainer: '#3700B3',
    secondary: '#03DAC6',
    secondaryContainer: '#018786',
    surface: '#121212',
    surfaceVariant: '#1E1E1E',
    background: '#000000',
    error: '#CF6679',
    onPrimary: '#000000',
    onSecondary: '#000000',
    onSurface: '#FFFFFF',
    onBackground: '#FFFFFF',
    onError: '#000000',
  },
  roundness: 8,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },
  body1: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    lineHeight: 16,
  },
};
