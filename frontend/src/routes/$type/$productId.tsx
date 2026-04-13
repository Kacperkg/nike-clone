import { fetchProduct } from '@/lib/products'
import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import Recommended from '@/components/Recommended'
import ProductImage from '@/components/product/ProductImage'
import ProductInfo from '@/components/product/ProductInfo'
import ProductSkeleton from '@/components/product/ProductSkeleton'

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

  const { data: product, isLoading, error } = useQuery({
    queryKey: [productId],
    queryFn: () => fetchProduct(parseInt(productId)),
  })

  if (error) return <p>Error loading product</p>

  return (
    <div className="min-h-screen mt-20 lg:mt-35 flex flex-col lg:grid lg:grid-cols-2">
      <ProductImage product={product} productId={productId} />

      {product && <ProductInfo product={product} type={type} />}

      {isLoading && <ProductSkeleton />}

      {product && <Recommended product={product} />}
    </div>
  )
}
