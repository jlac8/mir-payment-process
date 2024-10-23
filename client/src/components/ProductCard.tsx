import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import type { Product } from "@/types";

export default function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
}) {
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
        <Button onClick={() => onAddToCart(product)}>Agregar al carrito</Button>
      </CardFooter>
    </Card>
  );
}
