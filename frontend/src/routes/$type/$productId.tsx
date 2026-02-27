import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$type/$productId')({
  component: ProductDetailPage,
})

function ProductDetailPage() {
  const { type, productId } = Route.useParams()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Product {productId}</h1>
        <p className="text-gray-500">Category: {type}</p>
        <p className="text-gray-500">Product detail will go here.</p>
      </div>
    </div>
  )
}
