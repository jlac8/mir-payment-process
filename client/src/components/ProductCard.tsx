import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Product } from "@/types";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-52 h-52 rounded-md object-contain object-center"
          />
        </div>
        <CardTitle className="text-lg">{product.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-lg font-bold">${product.price}</span>
        <Button onClick={handleAddToCart}>Agregar al carrito</Button>
      </CardFooter>
    </Card>
  );
}
