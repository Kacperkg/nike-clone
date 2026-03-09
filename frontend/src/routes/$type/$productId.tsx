import { fetchProduct } from '@/lib/products'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/$type/$productId')({
  component: ProductDetailPage,
  loader: ({ params, context }) => {
    context.queryClient.prefetchQuery({
      queryKey: [params.productId],
      queryFn: () => fetchProduct(parseInt(params.productId)),
    })
  },
})

function ProductDetailPage() {
  const { type, productId } = Route.useParams()
  const router = useRouter()

  const { data: product, isLoading, error } = useQuery({
    queryKey: [productId],
    queryFn: () => fetchProduct(parseInt(productId)),
  })

  if (error) return <p>Error loading product</p>

  return (
    <div className="min-h-screen mt-20 grid-cols-2 grid">
      <motion.div
        layoutId={`product-${productId}`}
        className="bg-white overflow-hidden"
        style={{ borderRadius: 0 }}
        transition={{ layout: { duration: 0.5, type: 'spring', bounce: 0.2 } }}
      >
        {product?.image ? (
          <motion.img
            layout="position"
            src={product.image}
            alt={product.name}
            className="w-full max-h-[70vh] object-cover"
          />
        ) : (
          <div className="w-full aspect-square bg-gray-100 animate-pulse" />
        )}
      </motion.div>

      {product && (
        <motion.div
          layoutId={`product-info-${product.id}`}
          className="px-12 py-8"
          transition={{ layout: { duration: 0.5, type: 'spring', bounce: 0.2 } }}
        >
          <p className="text-gray-500 text-sm mb-2 capitalize">{type}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <h2 className="text-lg text-black/80 mt-2">£{product.price}</h2>
          <p className="text-gray-600 mt-6 max-w-2xl">{product.description}</p>
          <button
            onClick={() => router.history.back()}
            className="mt-8 text-black underline cursor-pointer"
          >
            ← Back
          </button>
        </motion.div>
      )}

      {isLoading && (
        <div className="px-12 py-8">
          <div className="h-8 w-48 bg-gray-100 rounded animate-pulse mb-4" />
          <div className="h-4 w-96 bg-gray-100 rounded animate-pulse" />
        </div>
      )}
    </div>
  )
}
