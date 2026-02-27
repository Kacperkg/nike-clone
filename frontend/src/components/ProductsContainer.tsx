import { fetchProducts } from '@/lib/products'
import { useQuery } from '@tanstack/react-query'
import ProductCard from "./ProductCard"

export default function ProductsContainer({type, category, subcategory}: {type?: string, category?: string, subcategory?: string}) {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products', type, category, subcategory],
        queryFn: () => fetchProducts({ type, category, subcategory }),
    })

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading products</p>


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products && products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
    )
}
    