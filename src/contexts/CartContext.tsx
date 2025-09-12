import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useReducer } from 'react';
import { CartContextType, CartItem, Product } from '../types';

const CART_STORAGE_KEY = '@fakestoreapp_cart';

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_FROM_CART'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: { cartItems: CartItem[] } };

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(item => item.product.id === product.id);

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { product, quantity }],
      };
    }

    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product.id !== action.payload.productId),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.product.id !== productId),
        };
      }

      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        ),
      };
    }

    case 'CLEAR_CART': {
      return {
        ...state,
        cartItems: [],
      };
    }

    case 'LOAD_CART': {
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    }

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from AsyncStorage on app start
  useEffect(() => {
    loadCartFromStorage();
  }, []);

  // Save cart to AsyncStorage whenever cart changes
  useEffect(() => {
    saveCartToStorage();
  }, [state.cartItems]);

  const loadCartFromStorage = async () => {
    try {
      const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (cartData) {
        const cartItems = JSON.parse(cartData);
        dispatch({ type: 'LOAD_CART', payload: { cartItems } });
      }
    } catch (error) {
      console.error('Error loading cart from storage:', error);
    }
  };

  const saveCartToStorage = async () => {
    try {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartItems));
    } catch (error) {
      console.error('Error saving cart to storage:', error);
    }
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalPrice = (): number => {
    return state.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = (): number => {
    return state.cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
