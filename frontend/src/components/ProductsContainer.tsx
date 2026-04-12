import { fetchProducts } from '@/lib/products'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import ProductCard from './ProductCard'

export default function ProductsContainer({
  type,
  category,
  subcategory,
  subhead,
}: {
  type?: string
  category?: string
  subcategory?: string
  subhead?: string
}) {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['products', type, category, subcategory],
    queryFn: ({ pageParam }) =>
      fetchProducts({ type, category, subcategory, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.next ? lastPageParam + 1 : undefined,

    staleTime: 5 * 60 * 1000,
  })

  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0, rootMargin: '200px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    type,
    category,
    subcategory,
  ])

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonProductCard key={i} />
        ))}
      </div>
    )
  if (error) return <p>Error loading products</p>

  const products = data?.pages.flatMap((page) => page.results) ?? []

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} subhead={subhead} />
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />

      {isFetchingNextPage && (
        <p className="text-center py-4">Loading more...</p>
      )}
    </div>
  )
}

const SkeletonProductCard = () => (
  <div className="flex flex-col gap-4 overflow-hidden w-full h-auto rounded-md cursor-pointer bg-white">
    <div className="object-cover w-full min-h-50 aspect-square bg-gray-200 animate-pulse" />

    <div className="w-full py-4 bg-gray-200 animate-pulse h-20" />
  </div>
)
