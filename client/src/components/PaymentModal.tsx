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
import { useState } from "react";
import { Label } from "./ui/label";

const stripePromise = loadStripe("stripe_public_key");

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
      } else {
        console.log("Payment Method:", paymentMethod);
        setIsProcessing(false);
        onClose();
        alert("¡Pago procesado con éxito!");
      }
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

export function PaymentModal({
  isOpen,
  onClose,
  total,
}: {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Completar Pago</DialogTitle>
          <DialogDescription id="dialog-description">
            Total a pagar: ${total}
          </DialogDescription>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <CheckoutForm total={total} onClose={onClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
