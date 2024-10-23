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
  const { cart, total, removeFromCart, setIsModalOpen } =
    useContext(CartContext);

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Mi Tienda Online 👨🏻‍💻</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-6 w-6" />
            {cart.length > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {cart.length}
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
                        ${item.price}
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
