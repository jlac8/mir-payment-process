import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

export default function Header() {
  const { cart, total, removeFromCart, setIsModalOpen, updateCart } =
    useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Mi Tienda Online 👨🏻‍💻</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {totalItems}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrito de Compras</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-200px)] mt-4">
            {cart.length === 0 ? (
              <p className="text-center text-muted-foreground">
                Tu carrito está vacío
              </p>
            ) : (
              <ul className="space-y-4">
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        ${item.price} x
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              Number(e.target.value)
                            )
                          }
                          className="mx-2 w-12 text-center border rounded bg-white"
                        />
                        = ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </ScrollArea>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <Button
              className="w-full"
              disabled={cart.length === 0}
              onClick={() => setIsModalOpen(true)}
            >
              Proceder al pago
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
