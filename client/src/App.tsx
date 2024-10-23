import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { Product } from "./types";
import Header from "./components/Header";
import { PaymentModal } from "./components/PaymentModal";
import products from "@/assets/data.json";

const productsWithId = products.map((product) => ({
  ...product,
  id: crypto.randomUUID(),
}));

export default function App() {
  const [cart, setCart] = useState<Product[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        total={total}
        setIsPaymentModalOpen={setIsPaymentModalOpen}
      />
      <main className="max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsWithId.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
      />
    </>
  );
}
