// src/lib/products.ts
import { apiUrl } from './api'

export interface Product {
  id: string
  name: string
  subtitle: string
  description: string
  price: string
  category: string
  product_type: string
  subcategory: string
  image: string
  is_featured: boolean
  images: { id: number; image: string; alt_text: string }[]
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export async function fetchProducts(params?: {
  category?: string
  type?: string
  subcategory?: string
  featured?: boolean
  page?: number
  limit?: number
  price_min?: number
  price_max?: number
  sort_by?: string
}) {
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.set('category', params.category)
  if (params?.type) searchParams.set('type', params.type)
  if (params?.subcategory) searchParams.set('subcategory', params.subcategory)
  if (params?.featured) searchParams.set('featured', 'true')
  if (params?.page) searchParams.set('page', params.page.toString())
  if (params?.limit) searchParams.set('limit', params.limit.toString())
  if (params?.price_min != null) searchParams.set('price_min', params.price_min.toString())
  if (params?.price_max != null) searchParams.set('price_max', params.price_max.toString())
  if (params?.sort_by) searchParams.set('sort_by', params.sort_by)

  const res = await fetch(apiUrl(`/api/products/?${searchParams.toString()}`))
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json() as Promise<PaginatedResponse<Product>>
}

export async function fetchProduct(id: number) {
  const res = await fetch(apiUrl(`/api/products/${id}/`))
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json() as Promise<Product>
}