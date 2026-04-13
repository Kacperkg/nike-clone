import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import type { Product } from '@/lib/products'
import Sizes from '@/components/Sizes'
import Button from '@/components/Buttons'

export default function ProductInfo({
  product,
  type,
}: {
  product: Product
  type: string
}) {
  return (
    <motion.div
      layoutId={`product-info-${product.id}`}
      className="px-6 md:px-12 py-6 lg:py-0 max-w-2xl flex flex-col justify-between"
      transition={{ layout: { duration: 0.5, type: 'spring', bounce: 0.2 } }}
    >
      <div>
        <p className="text-gray-500 text-sm mb-2 capitalize">{type}</p>
        <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
        <h2 className="text-lg text-black/80 mt-2">£{product.price}</h2>
        <p className="text-gray-600 mt-6 max-w-2xl">{product.description}</p>

        <Sizes type={product.product_type === 'shoes' ? 'shoes' : 'clothing'} />
      </div>
          

      <div className="flex flex-col gap-4">
        <Button className="w-full font-semibold">Add to Cart</Button>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 font-semibold"
        >
          <p>Favourite</p>
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  )
}
