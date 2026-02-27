import { Link } from "@tanstack/react-router"
import { type Product } from "@/lib/products"

export default function ProductCard({ product }: { product: Product }) { 
    return (
        <Link to="/$type/$productId" params={{ type: 'products', productId: product.id }} className="overflow-hidden relative w-full h-auto hover:scale-104 transition-transform rounded-md">
              <img src={product.image} alt={product.name} className="object-cover" />
              <div className="absolute bottom-0 left-0 w-full p-4 text-black">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-black/70">£{product.price}</p>
              </div>
        </Link> 
    )
}