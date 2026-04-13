import { ChevronDown, ChevronUp, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'

export interface Filters {
  subcategory?: string
  price_min?: number
  price_max?: number
  sort_by?: string
}

const PRICE_RANGES = [
  { label: 'Under £50', min: undefined, max: 50 },
  { label: '£50 – £100', min: 50, max: 100 },
  { label: '£100 – £150', min: 100, max: 150 },
  { label: 'Over £150', min: 150, max: undefined },
] as const

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low – High', value: 'price_asc' },
  { label: 'Price: High – Low', value: 'price_desc' },
] as const

const SUBCATEGORIES: Record<string, { value: string; label: string }[]> = {
  shoes: [
    { value: 'lifestyle', label: 'Lifestyle' },
    { value: 'jordan', label: 'Jordan' },
    { value: 'running', label: 'Running' },
    { value: 'football', label: 'Football' },
    { value: 'basketball', label: 'Basketball' },
    { value: 'training-gym', label: 'Training & Gym' },
    { value: 'skateboarding', label: 'Skateboarding' },
  ],
  clothing: [
    { value: 'hoodies-sweatshirts', label: 'Hoodies & Sweatshirts' },
    { value: 'trousers-tights', label: 'Trousers & Tights' },
    { value: 'tracksuits', label: 'Tracksuits' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'tops-tshirts', label: 'Tops & T-Shirts' },
    { value: 'shorts', label: 'Shorts' },
  ],
  accessories: [],
}

export default function FilterSidebar({
  type,
  filters,
  onChange,
}: {
  type: string
  filters: Filters
  onChange: (filters: Filters) => void
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openSections, setOpenSections] = useState({
    subcategory: true,
    price: true,
    sort: true,
  })

  const toggle = (section: keyof typeof openSections) =>
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))

  const subcategories = SUBCATEGORIES[type] ?? []

  const activeCount =
    (filters.subcategory ? 1 : 0) +
    (filters.price_min != null || filters.price_max != null ? 1 : 0) +
    (filters.sort_by ? 1 : 0)

  const filterContent = (
    <>
      {subcategories.length > 0 && (
        <div className="border-b pb-4 mb-4">
          <button
            onClick={() => toggle('subcategory')}
            className="flex w-full items-center justify-between font-semibold mb-3 cursor-pointer"
          >
            Category
            {openSections.subcategory ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          {openSections.subcategory && (
            <ul className="flex flex-col gap-2">
              {subcategories.map((sub) => (
                <li key={sub.value}>
                  <button
                    onClick={() =>
                      onChange({
                        ...filters,
                        subcategory:
                          filters.subcategory === sub.value ? undefined : sub.value,
                      })
                    }
                    className={`cursor-pointer hover:text-black transition ${
                      filters.subcategory === sub.value
                        ? 'text-black font-medium'
                        : 'text-gray-500'
                    }`}
                  >
                    {sub.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Price Range */}
      <div className="border-b pb-4 mb-4">
        <button
          onClick={() => toggle('price')}
          className="flex w-full items-center justify-between font-semibold mb-3 cursor-pointer"
        >
          Price
          {openSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.price && (
          <ul className="flex flex-col gap-2">
            {PRICE_RANGES.map((range) => {
              const isActive =
                filters.price_min === range.min && filters.price_max === range.max
              return (
                <li key={range.label}>
                  <button
                    onClick={() =>
                      onChange({
                        ...filters,
                        price_min: isActive ? undefined : range.min,
                        price_max: isActive ? undefined : range.max,
                      })
                    }
                    className={`cursor-pointer hover:text-black transition ${
                      isActive ? 'text-black font-medium' : 'text-gray-500'
                    }`}
                  >
                    {range.label}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      {/* Sort */}
      <div className="pb-4">
        <button
          onClick={() => toggle('sort')}
          className="flex w-full items-center justify-between font-semibold mb-3 cursor-pointer"
        >
          Sort By
          {openSections.sort ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {openSections.sort && (
          <ul className="flex flex-col gap-2">
            {SORT_OPTIONS.map((opt) => (
              <li key={opt.value}>
                <button
                  onClick={() =>
                    onChange({
                      ...filters,
                      sort_by: filters.sort_by === opt.value ? undefined : opt.value,
                    })
                  }
                  className={`cursor-pointer hover:text-black transition ${
                    filters.sort_by === opt.value
                      ? 'text-black font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 mb-4 text-sm font-semibold cursor-pointer"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters{activeCount > 0 && ` (${activeCount})`}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button onClick={() => setMobileOpen(false)} className="cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-sm">{filterContent}</div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-56 shrink-0 pr-8 text-sm">
        {filterContent}
      </aside>
    </>
  )
}
