import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { Label } from "./ui/label";
import { Payload } from "@/types";
import { CartContext } from "@/context/CartContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_CLIENT_SECRET);
const apiUrl = import.meta.env.VITE_API_URL;

const sendDataToBackend = async (data: Payload) => {
  try {
    const res = await fetch(`${apiUrl}/api/checkout/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

function CheckoutForm({
  total,
  onClose,
}: {
  total: number;
  onClose: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const { setCart } = useContext(CartContext);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setPaymentError(null);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setPaymentError(
          error.message || "Ha ocurrido un error al procesar el pago."
        );
        setIsProcessing(false);
      }

      setIsProcessing(false);

      const resFromBack = await sendDataToBackend({
        amount: total * 100,
        paymentMethod,
        currency: "USD",
        userId: 1,
      });
      console.log("resBack", resFromBack);

      onClose();
      alert("¡Pago procesado con éxito!");
      setCart([]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-element">Tarjeta de Crédito o Débito</Label>
          <CardElement id="card-element" className="p-3 border rounded-md" />
        </div>
        {paymentError && (
          <div className="text-red-500 text-sm">{paymentError}</div>
        )}
      </div>
      <DialogFooter className="mt-4">
        <Button type="submit" disabled={!stripe || isProcessing}>
          {isProcessing ? "Procesando..." : `Pagar $${total}`}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function PaymentModal() {
  const { isModalOpen, setIsModalOpen, total } = useContext(CartContext);
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Completar Pago</DialogTitle>
          <DialogDescription id="dialog-description">
            Total a pagar: ${total}
          </DialogDescription>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <CheckoutForm total={total} onClose={() => setIsModalOpen(false)} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
