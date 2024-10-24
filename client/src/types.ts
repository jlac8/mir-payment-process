import { PaymentMethod } from "@stripe/stripe-js";

export interface Product {
  id: string;
  title: string;
  price: number;
  description?: string;
  image: string;
  quantity?: number;
}

export interface Payload {
  amount: number;
  paymentMethod?: PaymentMethod;
  currency: string;
  userId?: number;
}

export interface CartContextProps {
  cart: Product[];
  updateCart: (product: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  total: number;
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
}
