import { CartContextProps, Product } from "@/types";
import { createContext, useState } from "react";

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>(
    JSON.parse(localStorage.getItem("cart") ?? "[]")
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addToCart = (product: Product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isModalOpen,
        setIsModalOpen,
        addToCart,
        removeFromCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
