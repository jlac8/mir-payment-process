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

  const updateCart = (cart: Product[]) => {
    setCart(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const addToCart = (product: Product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce(
    (sum, item) => +(sum + item.price * (item.quantity || 1)).toFixed(2),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCart,
        total,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
