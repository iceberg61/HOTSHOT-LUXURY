import { useState } from 'react'
import { Heart, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import products from '../data/products'
import useCartStore from '../store/cartStore'

const tabs = ['ALL', 'TOPS', 'ACCESSORIES']

const ICON_VISIBLE = 'opacity-100 translate-x-0'
const ICON_HIDDEN = 'opacity-0 translate-x-4'

function ProductGrid() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [hoveredId, setHoveredId] = useState(null)
  const [addedId, setAddedId] = useState(null)

  const addToCart = useCartStore((state) => state.addToCart)

  const filtered = activeTab === 'ALL'
    ? products
    : products.filter((p) => p.category === activeTab)

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    const defaultSize = product.sizes[0]
    addToCart(product, defaultSize, 1)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 2000)
  }

  return (
    <section className="bg-black py-20 px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-3">
            Best Selling
          </p>
          <h2 className="text-white text-4xl font-black uppercase tracking-wider mb-4">
            The Drop
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="w-16 h-px bg-zinc-700" />
            <div className="w-2 h-2 border border-red-500 rotate-45" />
            <div className="w-16 h-px bg-zinc-700" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-3 text-xs tracking-widest uppercase border transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
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
                  <Heart size={20} />
                </button>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="bg-black border border-zinc-600 p-2.5 hover:border-red-500 hover:text-red-500 text-zinc-400 transition-all duration-300"
                >
                  <Eye size={20} />
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

      </div>
    </section>
  )
}

export default ProductGrid