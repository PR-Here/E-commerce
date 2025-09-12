import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { useCart } from '../contexts/CartContext';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { ProductListScreen } from '../screens/ProductListScreen';
import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  const { getTotalItems } = useCart();

  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6366F1',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'Inter_700Bold',
        },
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={({ navigation }) => ({
          title: 'FakeStoreApp',
          headerRight: () => (
            <IconButton
              icon="cart"
              iconColor="#fff"
              onPress={() => navigation.navigate('Cart')}
              style={{ marginRight: 8 }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.product.title,
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'Shopping Cart',
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
        }}
      />
    </Stack.Navigator>
  );
};
