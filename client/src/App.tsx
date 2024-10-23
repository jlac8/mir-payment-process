import ProductCard from "./components/ProductCard";
import Header from "./components/Header";
import { PaymentModal } from "./components/PaymentModal";
import { CartProvider } from "./context/CartContext";
import products from "@/assets/data.json";

const productsWithId = products.map((product) => ({
  ...product,
  id: crypto.randomUUID(),
}));

export default function App() {
  return (
    <CartProvider>
      <Header />
      <main className="max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsWithId.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <PaymentModal />
    </CartProvider>
  );
}
