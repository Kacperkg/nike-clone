import { motion } from 'framer-motion'
import type { Product } from '@/lib/products'

export default function ProductImage({
  product,
  productId,
}: {
  product?: Product
  productId: string
}) {
  return (
    <motion.div
      layoutId={`product-${productId}`}
      style={{ borderRadius: 0 }}
      transition={{ layout: { duration: 0.5, type: 'spring', bounce: 0.2 } }}
    >
      {product?.image ? (
        <motion.img
          layout="position"
          src={product.image}
          alt={product.name}
          className="w-full max-h-[70vh] object-cover"
        />
      ) : (
        <div className="w-full aspect-square bg-gray-100 animate-pulse" />
      )}
    </motion.div>
  )
}
