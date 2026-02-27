import { createFileRoute } from '@tanstack/react-router'
import ProductsContainer from '@/components/ProductsContainer'

const VALID_TYPES = ['shoes', 'clothing', 'accessories'] as const

export const Route = createFileRoute('/$type/')({
  component: CategoryPage,
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string) || undefined,
    subcategory: (search.subcategory as string) || undefined,
  }),
})

function CategoryPage() {
  const { type } = Route.useParams()
  const { category } = Route.useSearch()
  const { subcategory } = Route.useSearch()

  const title = category
    ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s ${subcategory ? `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} ` : ''}${type.charAt(0).toUpperCase() + type.slice(1)}`
    : type.charAt(0).toUpperCase() + type.slice(1)

  const subHead = subcategory
    ? `${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)} / ${type.charAt(0).toUpperCase() + type.slice(1)}`
    : undefined

  if (!VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Page not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-12 mt-16">
      <div className="py-16">
        <h2 className="text-sm text-gray-500">{subHead}</h2>
              <h1 className="font-semibold text-2xl">{title}</h1>
      </div>
      <div className="flex">
        <aside className="flex-1"></aside>
        <section className="flex-4">
          <ProductsContainer
            type={type}
            category={category}
            subcategory={subcategory}
            subhead={subHead}
          />
        </section>
      </div>
    </div>
  )
}
