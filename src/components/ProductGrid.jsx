import { useState, useEffect } from 'react'
import { Heart, Eye } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'
import useWishlistStore from '../store/wishlistStore'
import { fetchProducts } from '../api/productApi'
import QuickView from './QuickView'

const tabs = ['ALL', 'TOPS', 'ACCESSORIES']
const ICON_VISIBLE = 'opacity-100 translate-x-0'
const ICON_HIDDEN = 'opacity-0 translate-x-4'

function ProductGrid({ limit = null }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('ALL')
  const [hoveredId, setHoveredId] = useState(null)
  const [addedId, setAddedId] = useState(null)
  const [selectedSizes, setSelectedSizes] = useState({})
  const [sizeError, setSizeError] = useState(null)
  const [quickViewProduct, setQuickViewProduct] = useState(null)

  const navigate = useNavigate()
  const addToCart = useCartStore((state) => state.addToCart)
  const { user } = useAuthStore()
  const { fetchWishlist, addItem, removeItem, isWishlisted } = useWishlistStore()

  useEffect(() => {
    if (user) fetchWishlist(user.token)
  }, [user, fetchWishlist])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        const data = await fetchProducts({ category: activeTab === 'ALL' ? '' : activeTab })
        setProducts(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    loadProducts()
  }, [activeTab])

  const displayedProducts = limit ? products.slice(0, limit) : products

  const handleAddToCart = (e, product) => {
    e.preventDefault()
    const outOfStock = product.countInStock === 0
    if (outOfStock) return

    const selectedSize = selectedSizes[product._id]
    if (!selectedSize) {
      setSizeError(product._id)
      setTimeout(() => setSizeError(null), 2000)
      return
    }

    addToCart(product, selectedSize, 1)
    setAddedId(product._id)
    setTimeout(() => setAddedId(null), 2000)
  }

  const handleSizeSelect = (e, productId, size) => {
    e.preventDefault()
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }))
    if (sizeError === productId) setSizeError(null)
  }

  const handleWishlist = async (e, product) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
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

  return (
    <section className="bg-black py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-3">Best Selling</p>
          <h2 className="text-white text-4xl font-black uppercase tracking-wider mb-4">The Drop</h2>
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
              className={`px-8 py-3 text-xs tracking-widest uppercase border rounded-lg transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-red-500 border-red-500 text-white'
                  : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedProducts.map((product) => {
                const outOfStock = product.countInStock === 0
                const selectedSize = selectedSizes[product._id]
                const showSizeError = sizeError === product._id

                return (
                  <Link
                    to={`/product/${product._id}`}
                    key={product._id}
                    className="group relative bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 hover:border-red-500 transition-all duration-300 block"
                    onMouseEnter={() => setHoveredId(product._id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Tag */}
                    {product.tag && !outOfStock && (
                      <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] tracking-widest px-2 py-1 uppercase">
                        {product.tag}
                      </span>
                    )}

                    {/* Out of stock badge */}
                    {outOfStock && (
                      <span className="absolute top-3 left-3 z-10 bg-zinc-700 text-zinc-300 text-[10px] tracking-widest px-2 py-1 uppercase">
                        Out of Stock
                      </span>
                    )}

                    {/* Icons */}
                    <div className={`absolute top-3 right-3 z-10 flex flex-col gap-2 transition-all duration-300 ${
                      hoveredId === product._id ? ICON_VISIBLE : ICON_HIDDEN
                    }`}>
                      <button
                        onClick={(e) => handleWishlist(e, product)}
                        className={`border rounded-lg p-2.5 transition-all duration-300 ${
                          isWishlisted(product._id)
                            ? 'bg-red-500 border-red-500 text-white'
                            : 'bg-black border-zinc-600 text-zinc-400 hover:border-red-500 hover:text-red-500'
                        }`}
                      >
                        <Heart size={18} fill={isWishlisted(product._id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={(e) => handleQuickView(e, product)}
                        className="bg-black border rounded-lg border-zinc-600 p-2.5 hover:border-red-500 hover:text-red-500 text-zinc-400 transition-all duration-300"
                      >
                        <Eye size={18} />
                      </button>
                    </div>

                    {/* Image */}
                    <div className={`overflow-hidden bg-zinc-900 ${outOfStock ? 'opacity-50' : ''}`} style={{ height: '280px' }}>
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

                      {product.numReviews > 0 && (
                        <div className="flex items-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-xs ${star <= Math.round(product.rating) ? 'text-yellow-500' : 'text-zinc-700'}`}>★</span>
                          ))}
                          <span className="text-zinc-600 text-xs ml-1">({product.numReviews})</span>
                        </div>
                      )}

                      <p className="text-red-500 text-sm font-medium mb-3">
                        ₦{product.price.toLocaleString()}.00
                      </p>

                      {/* Size selector — only if in stock */}
                      {!outOfStock && product.sizes && product.sizes.length > 0 && (
                        <div className="flex items-center gap-1 mb-3 flex-wrap">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={(e) => handleSizeSelect(e, product._id, size)}
                              className={`px-2 py-1 text-[10px] tracking-widest uppercase border rounded-lg transition-all duration-200 ${
                                selectedSize === size
                                  ? 'border-red-500 text-red-500 bg-red-500/10'
                                  : 'border-zinc-700 text-zinc-500 hover:border-zinc-400 hover:text-zinc-300'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Size error hint */}
                      {showSizeError && (
                        <p className="text-yellow-500 text-[10px] tracking-widest uppercase mb-2">
                          Please select a size
                        </p>
                      )}

                      {/* Add to cart button */}
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={outOfStock}
                        className={`w-full text-xs tracking-widest uppercase py-3 border rounded-lg transition-all duration-300 ${
                          outOfStock
                            ? 'border-zinc-700 text-zinc-600 cursor-not-allowed'
                            : addedId === product._id
                            ? 'border-green-500 text-green-500'
                            : 'border-red-500 text-red-500 hover:bg-red-500 hover:text-black'
                        }`}
                      >
                        {outOfStock ? 'Out of Stock' : addedId === product._id ? 'Added ✓' : 'Add to Cart'}
                      </button>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* View All button */}
            {limit && products.length > limit && (
              <div className="text-center mt-12">
                <Link
                  to="/shop"
                  className="border rounded-lg border-red-500 text-red-500 text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-red-500 hover:text-black transition-all duration-300"
                >
                  View All {products.length} Products →
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  )
}

export default ProductGrid