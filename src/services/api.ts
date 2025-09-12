import { Product } from '../types';

const API_BASE_URL = 'https://fakestoreapi.com';

export class ApiService {
  static async fetchProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  static async fetchProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  }

  static async fetchCategories(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const categories = await response.json();
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  static async fetchProductsByCategory(category: string): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw new Error('Failed to fetch products by category');
    }
  }
}
