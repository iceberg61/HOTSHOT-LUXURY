import { useState } from 'react'
import { Heart, Eye, SlidersHorizontal, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import products from '../data/products'
import useCartStore from '../store/cartStore'

const categories = ['ALL', 'TOPS', 'ACCESSORIES']
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Newest']

const ICON_VISIBLE = 'opacity-100 translate-x-0'
const ICON_HIDDEN = 'opacity-0 translate-x-4'

function Shop() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [activeSort, setActiveSort] = useState('Default')
  const [hoveredId, setHoveredId] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [maxPrice, setMaxPrice] = useState(500)
  const [addedId, setAddedId] = useState(null)

  const addToCart = useCartStore((state) => state.addToCart)

  let filtered = activeCategory === 'ALL'
    ? products
    : products.filter((p) => p.category === activeCategory)

  filtered = filtered.filter((p) => p.price <= maxPrice)

  if (activeSort === 'Price: Low to High') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (activeSort === 'Price: High to Low') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (activeSort === 'Newest') filtered = [...filtered].reverse()

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    const defaultSize = product.sizes[0]
    addToCart(product, defaultSize, 1)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-32 pb-16 px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none">
          <p className="text-zinc-900 text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            COLLECTION
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-6xl md:text-8xl font-black uppercase">
            The <span className="text-red-500">Shop</span>
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Shop</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-zinc-900 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 text-zinc-400 text-xs px-4 py-2 tracking-wider focus:outline-none focus:border-red-500 transition-colors"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-zinc-700 text-zinc-400 text-xs px-4 py-2 tracking-widest uppercase hover:border-red-500 hover:text-red-500 transition-all duration-300"
            >
              {showFilters ? <X size={14} /> : <SlidersHorizontal size={14} />}
              {showFilters ? 'Close' : 'Filter'}
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-zinc-900">
            <div className="flex items-center gap-8">
              <div>
                <p className="text-white text-xs tracking-widest uppercase mb-3">
                  Max Price: <span className="text-red-500">${maxPrice}</span>
                </p>
                <input
                  type="range"
                  min={50}
                  max={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-48 accent-red-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-12">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-zinc-600 text-xs tracking-widest uppercase">No products found</p>
            <button
              onClick={() => { setActiveCategory('ALL'); setMaxPrice(500) }}
              className="border border-red-500 text-red-500 text-xs tracking-widest uppercase px-6 py-3 hover:bg-red-500 hover:text-black transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group relative bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 hover:border-red-500 transition-all duration-300 block"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Tag */}
                {product.tag && (
                  <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] tracking-widest px-2 py-1 uppercase">
                    {product.tag}
                  </span>
                )}

                {/* Wishlist + View icons */}
                <div className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${
                  hoveredId === product.id ? ICON_VISIBLE : ICON_HIDDEN
                }`}>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="bg-black border border-zinc-600 p-2.5 hover:border-red-500 hover:text-red-500 text-zinc-400 transition-all duration-300"
                  >
                    <Heart size={18} />
                  </button>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="bg-black border border-zinc-600 p-2.5 hover:border-red-500 hover:text-red-500 text-zinc-400 transition-all duration-300"
                  >
                    <Eye size={18} />
                  </button>
                </div>

                {/* Image */}
                <div className="overflow-hidden bg-zinc-900" style={{ height: '280px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-1">
                    {product.name}
                  </h3>
                  <p className="text-red-500 text-sm font-medium mb-3">
                    ${product.price}.00
                  </p>

                  {/* Add to Cart — always visible */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`w-full text-xs tracking-widest uppercase py-3 border transition-all duration-300 ${
                      addedId === product.id
                        ? 'border-green-500 text-green-500'
                        : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-black'
                    }`}
                  >
                    {addedId === product.id ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>

              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Shop