// src/lib/products.ts
import { apiUrl } from './api'

export interface Product {
  id: number
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

export async function fetchProducts(params?: {
  category?: string
  type?: string
  subcategory?: string
  featured?: boolean
}) {
  const searchParams = new URLSearchParams()
  if (params?.category) searchParams.set('category', params.category)
  if (params?.type) searchParams.set('type', params.type)
  if (params?.subcategory) searchParams.set('subcategory', params.subcategory)
  if (params?.featured) searchParams.set('featured', 'true')

  const res = await fetch(apiUrl(`/api/products/?${searchParams.toString()}`))
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json() as Promise<Product[]>
}

export async function fetchProduct(id: number) {
  const res = await fetch(apiUrl(`/api/products/${id}/`))
  if (!res.ok) throw new Error('Failed to fetch product')
  return res.json() as Promise<Product>
}