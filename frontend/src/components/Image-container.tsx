import { Link } from '@tanstack/react-router'

export default function ImageContainer() {
    const IMAGESPATHS = [
      { src: 'jordan.jpeg', alt: 'Jordan Collection', link: '/shoes?subcategory=jordan' },
        { src: 'nyjah.jpg', alt: 'Skateboarding Collection', link: '/shoes?subcategory=skateboarding' },
        { src: 'basketball.jpeg', alt: 'Basketball Collection', link: '/shoes?subcategory=basketball' },
      {src: 'keely.jpg', alt: 'Running Collection', link: '/shoes?subcategory=running'},
  ]

  return IMAGESPATHS.map((path, index) => (
    <Link key={index} to={path.link} className="bg-blue-300 relative overflow-hidden group">
      <img
        src={`/public/${path.src}`}
        alt={path.alt}
        className="w-full h-auto object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <h2 className="text-2xl">{path.alt}</h2>
        <h4
          className="text-md bg-white text-black px-4 py-2 mt-2 inline-block rounded-md font-bold"
        >
          Shop
        </h4>
      </div>
    </Link>
  ))
}
