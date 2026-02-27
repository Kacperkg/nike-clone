import { Link } from '@tanstack/react-router'

export default function ImageContainer() {
    const IMAGESPATHS = [
      { src: 'jordan.jpeg', alt: 'Jordan Collection' },
      { src: 'nyjah.jpg', alt: 'Skateboarding Collection' }
  ]

  return IMAGESPATHS.map((path, index) => (
    <div className="bg-blue-300 relative overflow-hidden group">
      <img
        key={index}
        src={`/public/${path.src}`}
        alt={path.alt}
        className="w-full h-auto object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <h2 className="text-2xl">{path.alt}</h2>
        <Link
          to="/$type"
          params={{ type: 'shoes' }}
          className="text-md bg-white text-black px-4 py-2 mt-2 inline-block rounded-md font-bold"
        >
          Shop
        </Link>
      </div>
    </div>
  ))
}
