export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export interface CheckoutForm {
  name: string;
  address: string;
  paymentMethod: 'credit' | 'debit' | 'paypal' | 'cash';
}

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: Product };
  Cart: undefined;
  Checkout: undefined;
};
