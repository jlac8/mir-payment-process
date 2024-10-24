export interface PaymentIntentRequest {
  amount: number;
  currency: string;
  userId: number;
}

export interface SubscriptionRequest {
  priceId: string;
  userId: number;
}
