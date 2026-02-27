import { createFileRoute } from '@tanstack/react-router'

const VALID_TYPES = ['shoes', 'clothing', 'accessories'] as const

export const Route = createFileRoute('/$type/')({ 
  component: CategoryPage,
})

function CategoryPage() {
  const { type } = Route.useParams()

  if (!VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Page not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold uppercase mb-8">
          {type}
        </h1>
        <p className="text-gray-500">Products will be listed here.</p>
      </div>
    </div>
  )
}
