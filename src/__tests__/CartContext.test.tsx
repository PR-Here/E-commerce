import { act, render } from '@testing-library/react-native';
import React from 'react';
import { CartProvider, useCart } from '../contexts/CartContext';
import { Product } from '../types';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Test component to access cart context
const TestComponent = () => {
  const cart = useCart();
  return null;
};

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 10.99,
  description: 'Test Description',
  category: 'test',
  image: 'https://example.com/image.jpg',
  rating: {
    rate: 4.5,
    count: 100,
  },
};

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide cart context', () => {
    const { getByTestId } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    
    expect(getByTestId).toBeDefined();
  });

  it('should add item to cart', () => {
    let cartContext: any;
    
    const TestComponentWithCart = () => {
      cartContext = useCart();
      return null;
    };

    render(
      <CartProvider>
        <TestComponentWithCart />
      </CartProvider>
    );

    act(() => {
      cartContext.addToCart(mockProduct, 2);
    });

    expect(cartContext.cartItems).toHaveLength(1);
    expect(cartContext.cartItems[0].product).toEqual(mockProduct);
    expect(cartContext.cartItems[0].quantity).toBe(2);
  });

  it('should update quantity when adding existing item', () => {
    let cartContext: any;
    
    const TestComponentWithCart = () => {
      cartContext = useCart();
      return null;
    };

    render(
      <CartProvider>
        <TestComponentWithCart />
      </CartProvider>
    );

    act(() => {
      cartContext.addToCart(mockProduct, 2);
      cartContext.addToCart(mockProduct, 3);
    });

    expect(cartContext.cartItems).toHaveLength(1);
    expect(cartContext.cartItems[0].quantity).toBe(5);
  });

  it('should remove item from cart', () => {
    let cartContext: any;
    
    const TestComponentWithCart = () => {
      cartContext = useCart();
      return null;
    };

    render(
      <CartProvider>
        <TestComponentWithCart />
      </CartProvider>
    );

    act(() => {
      cartContext.addToCart(mockProduct, 2);
      cartContext.removeFromCart(mockProduct.id);
    });

    expect(cartContext.cartItems).toHaveLength(0);
  });

  it('should update item quantity', () => {
    let cartContext: any;
    
    const TestComponentWithCart = () => {
      cartContext = useCart();
      return null;
    };

    render(
      <CartProvider>
        <TestComponentWithCart />
      </CartProvider>
    );

    act(() => {
      cartContext.addToCart(mockProduct, 2);
      cartContext.updateQuantity(mockProduct.id, 5);
    });

    expect(cartContext.cartItems[0].quantity).toBe(5);
  });

  it('should remove item when quantity is 0', () => {
    let cartContext: any;
    
    const TestComponentWithCart = () => {
      cartContext = useCart();
      return null;
    };

    render(
      <CartProvider>
        <TestComponentWithCart />
      </CartProvider>
    );

    act(() => {
      cartContext.addToCart(mockProduct, 2);
      cartContext.updateQuantity(mockProduct.id, 0);
    });

    expect(cartContext.cartItems).toHaveLength(0);
  });

  it('should clear cart', () => {
    let cartContext: any;
    
    const TestComponentWithCart = () => {
      cartContext = useCart();
      return null;
    };

    render(
      <CartProvider>
        <TestComponentWithCart />
      </CartProvider>
    );

    act(() => {
      cartContext.addToCart(mockProduct, 2);
      cartContext.clearCart();
    });

    expect(cartContext.cartItems).toHaveLength(0);
  });

  it('should calculate total price correctly', () => {
    let cartContext: any;
    
    const TestComponentWithCart = () => {
      cartContext = useCart();
      return null;
    };

    render(
      <CartProvider>
        <TestComponentWithCart />
      </CartProvider>
    );

    act(() => {
      cartContext.addToCart(mockProduct, 2);
    });

    expect(cartContext.getTotalPrice()).toBe(21.98);
  });

  it('should calculate total items correctly', () => {
    let cartContext: any;
    
    const TestComponentWithCart = () => {
      cartContext = useCart();
      return null;
    };

    render(
      <CartProvider>
        <TestComponentWithCart />
      </CartProvider>
    );

    act(() => {
      cartContext.addToCart(mockProduct, 3);
    });

    expect(cartContext.getTotalItems()).toBe(3);
  });
});
