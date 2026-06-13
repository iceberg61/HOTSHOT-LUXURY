import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useCartStore from '../store/cartStore'
import { fetchProductById, fetchProducts } from '../api/productApi'
import SEO from '../components/SEO'

function ProductDetail() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [added, setAdded] = useState(false)

  const addToCart = useCartStore((state) => state.addToCart)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setSelectedSize(null)
        setQuantity(1)
        const data = await fetchProductById(id)
        setProduct(data)
        // Fetch related products
        const all = await fetchProducts({ category: data.category })
        setRelated(all.filter((p) => p._id !== id).slice(0, 4))
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    addToCart(product, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-zinc-600 text-xs tracking-widest uppercase">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="bg-black min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <p className="text-zinc-600 text-xs tracking-widest uppercase">Product not found</p>
          <Link
            to="/shop"
            className="border border-red-500 text-red-500 text-xs tracking-widest uppercase px-8 py-3 hover:bg-red-500 hover:text-black transition-all duration-300"
          >
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO
        title={product.name}
        description={product.description}
        image={product.image}
        url={`/product/${product._id}`}
      />
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-28 pb-4 px-8 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-zinc-600 text-xs">»</span>
          <Link to="/shop" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
            Shop
          </Link>
          <span className="text-zinc-600 text-xs">»</span>
          <span className="text-zinc-400 text-xs tracking-widest uppercase">{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto w-full px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left — Image */}
          <div>
            <div className="bg-zinc-950 border border-zinc-800 overflow-hidden" style={{ height: '550px' }}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex flex-col gap-6">

            <div>
              {product.tag && (
                <span className="inline-block bg-red-500 text-white text-[10px] tracking-widest px-3 py-1 uppercase mb-4">
                  {product.tag}
                </span>
              )}
              <h1 className="text-white text-4xl font-black uppercase tracking-wider mb-2">
                {product.name}
              </h1>
              <p className="text-red-500 text-2xl font-bold">${product.price}.00</p>
            </div>

            <div className="border-t border-zinc-800" />

            <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">
              {product.description}
            </p>

            {/* Stock status */}
            <p className={`text-xs tracking-widest uppercase ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
              {product.inStock ? `In Stock (${product.countInStock} left)` : 'Out of Stock'}
            </p>

            <div className="border-t border-zinc-800" />

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-white text-xs font-bold tracking-[0.3em] uppercase">Select Size</p>
                <button className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase border transition-all duration-300 ${
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
                <p className="text-zinc-600 text-xs tracking-wider mt-2">Please select a size</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <p className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-4">Quantity</p>
              <div className="flex items-center w-fit border border-zinc-700">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all text-sm"
                >−</button>
                <span className="px-6 py-3 text-white text-xs border-x border-zinc-700">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.countInStock, q + 1))}
                  className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all text-sm"
                >+</button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-3 text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 ${
                  added
                    ? 'bg-green-600 text-white'
                    : product.inStock
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={16} />
                {added ? 'Added to Cart ✓' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className={`border p-4 transition-all duration-300 ${
                  wishlisted
                    ? 'border-red-500 text-red-500 bg-red-500/10'
                    : 'border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            <Link
              to="/shop"
              className="flex items-center gap-2 text-zinc-600 text-xs tracking-widest uppercase hover:text-red-500 transition-colors w-fit"
            >
              <ArrowLeft size={14} />
              Back to Shop
            </Link>

          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="border-t border-zinc-900 px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-3">More Like This</p>
              <h2 className="text-white text-3xl font-black uppercase tracking-wider">Related Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((item) => (
                <Link
                  to={`/product/${item._id}`}
                  key={item._id}
                  className="group block bg-zinc-950 border border-zinc-800 hover:border-red-500 transition-all duration-300 rounded-lg overflow-hidden"
                >
                  <div className="overflow-hidden" style={{ height: '220px' }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      className="group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-xs font-bold tracking-wider uppercase mb-1">{item.name}</h3>
                    <p className="text-red-500 text-xs font-medium">${item.price}.00</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default ProductDetail