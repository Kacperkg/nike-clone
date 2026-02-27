import { Link } from "@tanstack/react-router"
import { type Product } from "@/lib/products"

export default function ProductCard({ product, subhead }: { product: Product, subhead?: string }) { 
    return (
        <Link to="/$type/$productId" params={{ type: 'products', productId: product.id }} className="overflow-hidden w-full h-auto hover:scale-104 transition-transform rounded-md">
              <img src={product.image} alt={product.name} className="object-cover w-full h-auto"/>
              <div className="w-full py-4 text-black">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                {subhead && <h3 className="text-black/50">{subhead}</h3>}
                <h2 className="text-black/80">£{product.price}</h2>
              </div>
        </Link> 
    )
}