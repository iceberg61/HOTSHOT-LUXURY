import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'
import { fetchProductById, fetchProducts } from '../api/productApi'
import SEO from '../components/SEO'
import { getProductReviews, createReview } from '../api/reviewApi'
import useWishlistStore from '../store/wishlistStore'

function ProductDetail() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [reviews, setReviews] = useState([])
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' })
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [reviewSuccess, setReviewSuccess] = useState('')
  const { fetchWishlist, addItem, removeItem, isWishlisted } = useWishlistStore()
  const user = useAuthStore((state) => state.user)
  const addToCart = useCartStore((state) => state.addToCart)



  useEffect(() => {
    if (user) fetchWishlist(user.token)
  }, [user, fetchWishlist])

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        setSelectedSize(null)
        setQuantity(1)

        // Load product and reviews in parallel
        const [data, reviewsData] = await Promise.all([
          fetchProductById(id),
          getProductReviews(id),
        ])

        setProduct(data)
        setReviews(reviewsData)

        // Load related separately after product is set
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

  const handleWishlist = async () => {
    if (!user) { window.location.href = '/login'; return }
    if (isWishlisted(product._id)) {
      await removeItem(user.token, product._id)
    } else {
      await addItem(user.token, product._id)
    }
  }

  const handleReviewSubmit = async () => {
    if (!reviewForm.name || !reviewForm.comment) {
      setReviewError('Name and comment are required')
      return
    }
    setReviewLoading(true)
    setReviewError('')
    try {
      const newReview = await createReview(id, reviewForm)
      setReviews([newReview, ...reviews])
      setReviewForm({ name: '', rating: 5, comment: '' })
      setReviewSuccess('Review submitted successfully!')
      setTimeout(() => setReviewSuccess(''), 3000)
    } catch (err) {
      setReviewError(err.message)
    } finally {
      setReviewLoading(false)
    }
  }

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
              <p className="text-red-500 text-2xl font-bold">₦{product.price}.00</p>
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
                {[{ name: 'Size Guide', path: '/size-guide' },].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-zinc-500 text-xs tracking-wider hover:text-red-500 transition-colors duration-300">
                      {item.name}
                    </Link>
                  </li>
                ))}
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
                onClick={handleWishlist}
                className={`border p-4 transition-all duration-300 ${
                  isWishlisted(product._id)
                    ? 'border-red-500 text-red-500 bg-red-500/10'
                    : 'border-zinc-700 text-zinc-400 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart size={18} fill={isWishlisted(product._id) ? 'currentColor' : 'none'} />
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
                    <p className="text-red-500 text-xs font-medium">₦{item.price}.00</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
        <div className="border-t border-zinc-900 px-4 sm:px-8 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

              {/* Left — Reviews List */}
              <div>
                <h2 className="text-white text-2xl font-black uppercase tracking-wider mb-2">
                  Reviews
                </h2>
                <p className="text-zinc-500 text-xs tracking-wider mb-8">
                  {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  {product.numReviews > 0 && (
                    <span className="ml-2 text-yellow-500">
                      {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
                      {' '}{product.rating?.toFixed(1)}
                    </span>
                  )}
                </p>

                {reviews.length === 0 ? (
                  <p className="text-zinc-600 text-xs tracking-widest uppercase">
                    No reviews yet — be the first!
                  </p>
                ) : (
                  <div className="flex flex-col gap-6">
                    {reviews.map((review) => (
                      <div key={review._id} className="border-b border-zinc-900 pb-6">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-white text-xs font-bold tracking-wider uppercase">
                            {review.name}
                          </p>
                          <p className="text-zinc-600 text-xs">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mb-3">
                          {[1,2,3,4,5].map((star) => (
                            <span key={star} className={`text-sm ${star <= review.rating ? 'text-yellow-500' : 'text-zinc-700'}`}>★</span>
                          ))}
                        </div>
                        <p className="text-zinc-400 text-xs tracking-wider leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right — Write Review */}
              <div>
                <h2 className="text-white text-2xl font-black uppercase tracking-wider mb-8">
                  Write a Review
                </h2>

                {reviewSuccess && (
                  <div className="bg-green-500/10 border border-green-500 px-4 py-3 mb-4">
                    <p className="text-green-500 text-xs tracking-wider">{reviewSuccess}</p>
                  </div>
                )}
                {reviewError && (
                  <div className="bg-red-500/10 border border-red-500 px-4 py-3 mb-4">
                    <p className="text-red-500 text-xs tracking-wider">{reviewError}</p>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Your Name *</label>
                    <input
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs px-4 py-3 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Rating *</label>
                    <div className="flex items-center gap-2">
                      {[1,2,3,4,5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                          className={`text-2xl transition-colors ${star <= reviewForm.rating ? 'text-yellow-500' : 'text-zinc-700 hover:text-yellow-500'}`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="text-zinc-500 text-xs ml-2">{reviewForm.rating}/5</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-zinc-500 text-xs tracking-widest uppercase mb-2 block">Comment *</label>
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                      placeholder="Share your experience with this product..."
                      rows={5}
                      className="w-full bg-zinc-900 border border-zinc-800 text-white text-xs px-4 py-3 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    onClick={handleReviewSubmit}
                    disabled={reviewLoading}
                    className={`w-full text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 ${
                      reviewLoading ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

      <Footer />
    </div>
  )
}

export default ProductDetail