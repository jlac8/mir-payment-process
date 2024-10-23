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
  userId?: string;
}
