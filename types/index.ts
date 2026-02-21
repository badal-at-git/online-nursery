// Product Types
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock?: number;
  featured?: boolean;
}

// Category Types
export interface Category {
  id: number;
  name: string;
  image: string;
  description: string;
  slug?: string;
}

// Hero Slide Types
export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  cta?: string;
  link?: string;
}

// Cart Item Types
export interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

// User Types
export interface User {
  id: number;
  name: string;
  email: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Order Types
export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  shippingAddress: Address;
}

// Newsletter Types
export interface NewsletterSubscription {
  email: string;
  subscribedAt: Date;
}