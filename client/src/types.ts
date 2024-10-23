import { PaymentMethod } from "@stripe/stripe-js";

export interface Product {
  id: string;
  title: string;
  price: number;
  description?: string;
  image: string;
}

export interface Payload {
  amount: number;
  paymentMethod?: PaymentMethod;
  currency: string;
  userId?: number;
}

export interface CartContextProps {
  cart: Product[];
  setCart: (cart: Product[]) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  total: number;
}
