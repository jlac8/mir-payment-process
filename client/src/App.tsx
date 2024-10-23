import { useState } from "react";
import ProductCard from "./components/ProductCard";
import { Product } from "./types";
import Header from "./components/Header";
import { PaymentModal } from "./components/PaymentModal";
import products from "@/assets/data.json";

// const products: Product[] = [
//   {
//     id: 1,
//     name: "Camiseta Casual",
//     price: 20,
//     description: "Camiseta cómoda para el día a día",
//   },
//   {
//     id: 2,
//     name: "Pantalón Vaquero",
//     price: 40,
//     description: "Pantalón resistente y versátil",
//   },
//   {
//     id: 3,
//     name: "Zapatillas Deportivas",
//     price: 60,
//     description: "Ideales para correr y entrenar",
//   },
//   {
//     id: 4,
//     name: "Gorra de Béisbol",
//     price: 15,
//     description: "Protege del sol con estilo",
//   },
//   {
//     id: 5,
//     name: "Pack de Calcetines",
//     price: 10,
//     description: "Set de 5 pares de calcetines",
//   },
//   {
//     id: 6,
//     name: "Chaqueta de Cuero",
//     price: 80,
//     description: "Elegante y duradera",
//   },
// ];

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
