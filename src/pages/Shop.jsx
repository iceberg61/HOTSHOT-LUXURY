import { useState, useEffect } from 'react'
import { Heart, Eye, SlidersHorizontal, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useCartStore from '../store/cartStore'
import { fetchProducts } from '../api/productApi'
import SEO from '../components/SEO'
import useAuthStore from '../store/authStore'
import useWishlistStore from '../store/wishlistStore'
import QuickView from '../components/QuickView'

const categories = ['ALL', 'TOPS', 'ACCESSORIES']
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Newest']

const ICON_VISIBLE = 'opacity-100 translate-x-0'
const ICON_HIDDEN = 'opacity-0 translate-x-4'

function Shop() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [activeSort, setActiveSort] = useState('Default')
  const [hoveredId, setHoveredId] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [maxPrice, setMaxPrice] = useState(500000)
  const [priceFilterActive, setPriceFilterActive] = useState(false)
  const [addedId, setAddedId] = useState(null)
  const { user } = useAuthStore()
  const { fetchWishlist, addItem, removeItem, isWishlisted } = useWishlistStore()
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts({
          category: activeCategory,
          sort: activeSort,
          maxPrice: priceFilterActive ? maxPrice : null,
        })
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [activeCategory, activeSort, maxPrice, priceFilterActive])

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    const defaultSize = product.sizes[0]
    addToCart(product, defaultSize, 1)
    setAddedId(product._id)
    setTimeout(() => setAddedId(null), 2000)
  }

  useEffect(() => {
    if (user) fetchWishlist(user.token)
  }, [user, fetchWishlist])

  const handleWishlist = async (e, product) => {
    e.preventDefault()
    if (!user) {
      window.location.assign('/login')
      return
    }
    if (isWishlisted(product._id)) {
      await removeItem(user.token, product._id)
    } else {
      await addItem(user.token, product._id)
    }
  }

  const handleQuickView = (e, product) => {
    e.preventDefault()
    setQuickViewProduct(product)
  }

  const handleResetFilters = () => {
    setActiveCategory('ALL')
    setMaxPrice(500000)
    setPriceFilterActive(false)
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO
        title="Shop The Collection"
        description="Browse the full Hotshot Luxury collection. Tops, accessories and limited edition drops."
        url="/shop"
      />
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
                  Max Price:{' '}
                  <span className="text-red-500">
                    {priceFilterActive ? `₦${maxPrice.toLocaleString()}` : 'No limit'}
                  </span>
                </p>
                <input
                  type="range"
                  min={1000}
                  max={500000}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => {
                    setMaxPrice(Number(e.target.value))
                    setPriceFilterActive(true)
                  }}
                  className="w-48 accent-red-500"
                />
                {priceFilterActive && (
                  <button
                    onClick={() => { setMaxPrice(500000); setPriceFilterActive(false) }}
                    className="block mt-2 text-zinc-500 text-xs tracking-widest uppercase hover:text-red-500 transition-colors"
                  >
                    Clear price filter ×
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-12">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-zinc-600 text-xs tracking-widest uppercase">Loading products...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-red-500 text-xs tracking-widest uppercase">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="border border-red-500 text-red-500 text-xs tracking-widest uppercase px-6 py-3 hover:bg-red-500 hover:text-black transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-zinc-600 text-xs tracking-widest uppercase">No products found</p>
            <button
              onClick={handleResetFilters}
              className="border border-red-500 text-red-500 text-xs tracking-widest uppercase px-6 py-3 hover:bg-red-500 hover:text-black transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Link
                to={`/product/${product._id}`}
                key={product._id}
                className="group relative bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 hover:border-red-500 transition-all duration-300 block"
                onMouseEnter={() => setHoveredId(product._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {product.tag && (
                  <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] tracking-widest px-2 py-1 uppercase">
                    {product.tag}
                  </span>
                )}

                <div className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${
                  hoveredId === product._id ? ICON_VISIBLE : ICON_HIDDEN
                }`}>
                  <button
                    onClick={(e) => handleWishlist(e, product)}
                    className={`border p-2.5 transition-all duration-300 ${
                      isWishlisted(product._id)
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-black border-zinc-600 text-zinc-400 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <Heart size={18} fill={isWishlisted(product._id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={(e) => handleQuickView(e, product)}
                    className="bg-black border border-zinc-600 p-2.5 hover:border-red-500 hover:text-red-500 text-zinc-400 transition-all duration-300"
                  >
                    <Eye size={18} />
                  </button>
                </div>

                <div className="overflow-hidden bg-zinc-900" style={{ height: '280px' }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-1">
                    {product.name}
                  </h3>
                  <p className="text-red-500 text-sm font-medium mb-3">
                    ₦{product.price.toLocaleString()}.00
                  </p>
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`w-full text-xs tracking-widest uppercase py-3 border transition-all duration-300 ${
                      addedId === product._id
                        ? 'border-green-500 text-green-500'
                        : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-black'
                    }`}
                  >
                    {addedId === product._id ? 'Added ✓' : 'Add to Cart'}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}

        {quickViewProduct && (
          <QuickView
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
          />
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Shop