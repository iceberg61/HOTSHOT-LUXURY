import { useState } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function QuickView({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)
  const addToCart = useCartStore((state) => state.addToCart)

  if (!product) return null

  const handleAddToCart = () => {
    if (!selectedSize) return
    addToCart(product, selectedSize, 1)
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 1500)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-4 bg-zinc-950 border border-zinc-800 overflow-y-auto max-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2">

          {/* Image */}
          <div className="bg-zinc-900" style={{ height: '300px' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                {product.tag && (
                  <span className="inline-block bg-red-500 text-white text-[10px] tracking-widest px-2 py-1 uppercase mb-2">
                    {product.tag}
                  </span>
                )}
                <h2 className="text-white text-lg font-black uppercase tracking-wider">
                  {product.name}
                </h2>
                <p className="text-red-500 text-lg font-bold mt-1">${product.price}.00</p>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-zinc-400 text-xs tracking-wider leading-relaxed">
              {product.description}
            </p>

            <div className="border-t border-zinc-800" />

            {/* Size */}
            <div>
              <p className="text-white text-xs font-bold tracking-widest uppercase mb-3">
                Select Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {!selectedSize && (
                <p className="text-zinc-600 text-xs mt-2">Please select a size</p>
              )}
            </div>

            {/* Buttons */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`w-full flex items-center justify-center gap-2 text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 ${
                added
                  ? 'bg-green-600 text-white'
                  : selectedSize
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
              }`}
            >
              <ShoppingCart size={14} />
              {added ? 'Added ✓' : 'Add to Cart'}
            </button>

            <Link
              to={`/product/${product._id}`}
              onClick={onClose}
              className="w-full border border-zinc-700 text-zinc-400 text-xs tracking-[0.3em] uppercase py-3 text-center hover:border-white hover:text-white transition-all duration-300"
            >
              View Full Details
            </Link>

          </div>
        </div>
      </div>
    </>
  )
}

export default QuickView