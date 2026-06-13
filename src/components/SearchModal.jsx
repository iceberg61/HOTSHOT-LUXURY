import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/productApi'

function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      // avoid synchronous setState during render/effect to prevent cascading renders
      const t = setTimeout(() => {
        setQuery('')
        setResults([])
      }, 0)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  useEffect(() => {
    if (!query.trim()) {
      // avoid synchronous setState during render/effect to prevent cascading renders
      const t = setTimeout(() => setResults([]), 0)
      return () => clearTimeout(t)
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const data = await fetchProducts({ search: query })
        setResults(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col">

      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/90"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-zinc-950 border-b border-zinc-800 px-4 sm:px-8 py-6">
        <div className="max-w-3xl mx-auto">

          {/* Search Input */}
          <div className="flex items-center gap-4 border-b border-zinc-700 pb-4">
            <Search size={20} className="text-red-500 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-white text-lg placeholder-zinc-600 focus:outline-none tracking-wider"
            />
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-white transition-colors flex-shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          {/* Results */}
          <div className="mt-4 max-h-96 overflow-y-auto">

            {loading && (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}

            {!loading && query && results.length === 0 && (
              <p className="text-zinc-600 text-xs tracking-widest uppercase text-center py-8">
                No products found for "{query}"
              </p>
            )}

            {!loading && results.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-zinc-600 text-xs tracking-widest uppercase mb-2">
                  {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
                </p>
                {results.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 p-3 hover:bg-zinc-900 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-zinc-900 overflow-hidden flex-shrink-0 border border-zinc-800 group-hover:border-red-500 transition-colors">
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-bold tracking-wider uppercase truncate">
                        {product.name}
                      </p>
                      <p className="text-zinc-500 text-xs mt-1">{product.category}</p>
                    </div>
                    <p className="text-red-500 text-xs font-bold flex-shrink-0">
                      ${product.price}.00
                    </p>
                  </Link>
                ))}
              </div>
            )}

            {!query && (
              <div className="py-8 text-center">
                <p className="text-zinc-600 text-xs tracking-widest uppercase">
                  Start typing to search products
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default SearchModal