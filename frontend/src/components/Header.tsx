import { Link } from '@tanstack/react-router'

import { useState } from 'react'
import { Heart, Menu, X, ShoppingBag } from 'lucide-react'

const NAV_CATEGORIES = [
  { slug: 'men', label: 'Men' },
  { slug: 'women', label: 'Women' },
  { slug: 'kids', label: 'Kids' },
]

const DROPDOWN_SECTIONS = [
  {
    type: 'shoes',
    label: 'Shoes',
    subcategories: [
      { slug: 'lifestyle', label: 'Lifestyle' },
      { slug: 'jordan', label: 'Jordan' },
      { slug: 'running', label: 'Running' },
      { slug: 'football', label: 'Football' },
      { slug: 'basketball', label: 'Basketball' },
      { slug: 'training-gym', label: 'Training and Gym' },
      { slug: 'skateboarding', label: 'Skateboarding' },
    ],
  },
  {
    type: 'clothing',
    label: 'Clothing',
    subcategories: [
      { slug: 'hoodies-sweatshirts', label: 'Hoodies and Sweatshirts' },
      { slug: 'trousers-tights', label: 'Trousers and Tights' },
      { slug: 'tracksuits', label: 'Tracksuits' },
      { slug: 'jackets', label: 'Jackets' },
      { slug: 'tops-tshirts', label: 'Tops and T-Shirts' },
      { slug: 'shorts', label: 'Shorts' },
    ],
  },
  {
    type: 'accessories',
    label: 'Accessories',
    subcategories: [],
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <>
      <header className="relative bg-white border-b border-gray-200" onMouseLeave={() => setActiveCategory(null)}>
        <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link to="/" className="text-black">
            <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="80" height="80" fill="none">
              <path fill="currentColor" fillRule="evenodd" d="M21 8.719L7.836 14.303C6.74 14.768 5.818 15 5.075 15c-.836 0-1.445-.295-1.819-.884-.485-.76-.273-1.982.559-3.272.494-.754 1.122-1.446 1.734-2.108-.144.234-1.415 2.349-.025 3.345.275.2.666.298 1.147.298.386 0 .829-.063 1.316-.19L21 8.719z" clipRule="evenodd" />
            </svg>
          </Link>

          <div className="hidden md:flex items-center gap-8 font-semibold text-gray-700">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                to="/$type"
                params={{ type: 'shoes' }}
                search={{ category: cat.slug }}
                className={`cursor-pointer py-4 inline-block border-b-2 ${
                  activeCategory === cat.slug ? 'border-black' : 'border-transparent'
                }`}
                onMouseEnter={() => setActiveCategory(cat.slug)}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Heart size={40} className="text-gray-700 hover:bg-gray-200 rounded-full p-2" />
            <ShoppingBag size={40} className="text-gray-700 hover:bg-gray-200 rounded-full p-2" />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Full-width dropdown */}
        {activeCategory && (
          <div
            className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200 z-50"
            onMouseEnter={() => setActiveCategory(activeCategory)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="max-w-7xl mx-auto px-4 py-8 flex gap-16 justify-center">
              {DROPDOWN_SECTIONS.filter((s) => s.subcategories.length > 0).map((section) => (
                <div key={section.type} className="flex flex-col gap-3">
                  <h3 className="font-semibold text-sm text-black">{section.label}</h3>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <Link
                        to="/$type"
                        params={{ type: section.type }}
                        search={{ category: activeCategory }}
                        onClick={() => setActiveCategory(null)}
                        className="text-sm text-gray-500 hover:text-black whitespace-nowrap"
                      >
                        All {section.label}
                      </Link>
                    </li>
                    {section.subcategories.map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          to="/$type"
                          params={{ type: section.type }}
                          search={{ subcategory: sub.slug, category: activeCategory }}
                          onClick={() => setActiveCategory(null)}
                          className="text-sm text-gray-500 hover:text-black whitespace-nowrap"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-sm text-black">Accessories</h3>
                <ul className="flex flex-col gap-2">
                  <li>
                    <Link
                      to="/$type"
                      params={{ type: 'accessories' }}
                      search={{ category: activeCategory }}
                      onClick={() => setActiveCategory(null)}
                      className="text-sm text-gray-500 hover:text-black whitespace-nowrap"
                    >
                      All Accessories
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="flex flex-col px-4 py-4 gap-4">
              {NAV_CATEGORIES.map((cat) => (
                <div key={cat.slug}>
                  <p className="text-sm font-semibold text-black uppercase mb-2">{cat.label}</p>
                  {DROPDOWN_SECTIONS.map((section) => (
                    <Link
                      key={section.type}
                      to="/$type"
                      params={{ type: section.type }}
                      search={{ category: cat.slug }}
                      onClick={() => setIsOpen(false)}
                      className="block text-sm text-gray-500 py-1 pl-2"
                    >
                      {section.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
