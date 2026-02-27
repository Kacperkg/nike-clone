import { createFileRoute, Link } from '@tanstack/react-router'
import ImageContainer from '../components/Image-container'
import { fetchProducts } from '@/lib/products'
import { useQuery } from '@tanstack/react-query'
import { type Product } from '../lib/products'

export const Route = createFileRoute('/')({ component: App })

function App() {


  return (
    <div className="min-h-screen">
      <div className='relative mt-16'>
        <VideoPlayer />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:px-12 py-4'>
        <ImageContainer />
      </div>
      <FeaturedProducts />
    </div>
  )
}


function VideoPlayer() {
  return (
    <video autoPlay loop muted className="w-full h-[80dvh] md:h-auto object-cover">
      <source src="/public/hero.mp4" type="video/mp4"/>
      Your browser does not support the video tag.
    </video>
  );
}


function FeaturedProducts() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: () => fetchProducts({ featured: true }),
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading products</p>

  const products = data?.results

  return (
    <div className="mx-auto py-8 px-12">
      <h2 className="text-2xl font-bold mb-4">Shop Our Icons</h2>
      {products && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

function FeaturedProductCard({ product }: { product: Product }) {
  return (
    <Link to="/$type/$productId" params={{ type: 'products', productId: product.id }} className="overflow-hidden relative w-full h-auto hover:scale-104 transition-transform rounded-md">
      <img src={product.image} alt={product.name} className="object-cover" />
      <div className="absolute bottom-0 left-0 w-full p-4 text-black">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-black/70">£{product.price}</p>
      </div>
    </Link>
  )
}