import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { Stack } from "expo-router";
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { CartProvider } from '../src/contexts/CartContext';
import { lightTheme } from '../src/utils/theme';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={lightTheme}>
        <CartProvider>
          <Stack>
            <Stack.Screen 
              name="index" 
              options={{ 
                title: 'FakeStoreApp',
                headerShown: false 
              }} 
            />
          </Stack>
        </CartProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
