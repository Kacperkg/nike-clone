import { Link } from '@tanstack/react-router'
import { type Product } from '@/lib/products'
import { motion } from 'framer-motion'

export default function ProductCard({
  product,
  subhead,
  disableLayoutAnimation = false,
}: {
  product: Product
  subhead?: string
  disableLayoutAnimation?: boolean
}) {
  return (
    <motion.div
      className="relative overflow-hidden w-full h-auto rounded-md cursor-pointer bg-white"
      layoutId={disableLayoutAnimation ? undefined : `product-${product.id}`}
      style={{ borderRadius: 8 }}
      whileHover={{ scale: 1.02 }}
      transition={{ layout: { duration: 0.5, type: 'spring', bounce: 0.2 } }}
    >
      <Link
        to="/$type/$productId"
        params={{ type: 'products', productId: product.id }}
      >
        <motion.img
          layout={disableLayoutAnimation ? undefined : 'position'}
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-auto"
        />
        <motion.div className="w-full py-4 text-black"
          layoutId={disableLayoutAnimation ? undefined : `product-info-${product.id}`}
          layout={disableLayoutAnimation ? undefined : 'position'}>
          <h1 className="text-lg font-semibold">{product.name}</h1>
          {subhead && <h3 className="text-black/50">{subhead}</h3>}
          <h2 className="text-black/80">£{product.price}</h2>
        </motion.div>
      </Link>
    </motion.div>
  )
}
