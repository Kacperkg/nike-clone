import { useQuery } from '@tanstack/react-query'
import { fetchProducts, type Product } from '@/lib/products'
import ProductCard from './ProductCard'

export default function Recommended({ product }: { product: Product }) {
  const { data } = useQuery({
    queryKey: ['recommended', product.id, product.subcategory, product.category],
    queryFn: () =>
      fetchProducts({
        subcategory: product.subcategory,
        limit: 6,
      }),
  })

  // Exclude the current product and take 5
  const similar =
    data?.results
      .filter((p) => p.id !== product.id)
      .slice(0, 5) ?? []

  if (similar.length === 0) return null

  return (
    <section className="col-span-2 px-12 py-16">
      <h2 className="text-2xl font-bold mb-8">You Might Also Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {similar.map((p) => (
          <ProductCard key={p.id} product={p} subhead={p.subtitle} disableLayoutAnimation />
        ))}
      </div>
    </section>
  )
}
