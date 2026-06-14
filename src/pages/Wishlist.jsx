import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useAuthStore from '../store/authStore'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'
import SEO from '../components/SEO'

function Wishlist() {
  const { user } = useAuthStore()
  const { items, fetchWishlist, removeItem } = useWishlistStore()
  const addToCart = useCartStore((state) => state.addToCart)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchWishlist(user.token)
  }, [user, fetchWishlist, navigate])

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO title="My Wishlist" url="/wishlist" />
      <Navbar />

      {/* Hero */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[5rem] sm:text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            WISHLIST
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl font-black uppercase">
            My <span className="text-red-500">Wishlist</span>
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Wishlist</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <Heart size={64} className="text-zinc-700" />
            <p className="text-zinc-600 text-xs tracking-widest uppercase">Your wishlist is empty</p>
            <Link
              to="/shop"
              className="bg-red-500 text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-red-600 transition-all duration-300"
            >
              Browse Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((product) => (
              <div key={product._id} className="group bg-zinc-950 border border-zinc-800 hover:border-red-500 transition-all duration-300 rounded-lg overflow-hidden">
                <Link to={`/product/${product._id}`}>
                  <div className="overflow-hidden" style={{ height: '250px' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product._id}`}>
                    <h3 className="text-white text-xs font-bold tracking-wider uppercase mb-1 hover:text-red-500 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-red-500 text-xs font-bold mb-4">₦{product.price}.00</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { addToCart(product, product.sizes[0], 1) }}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white text-xs tracking-widest uppercase py-3 hover:bg-red-600 transition-colors"
                    >
                      <ShoppingCart size={12} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(user.token, product._id)}
                      className="border border-zinc-700 p-3 text-zinc-400 hover:border-red-500 hover:text-red-500 transition-all duration-300"
                    >
                      <Heart size={14} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Wishlist