import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API_URL from '../api/config'
import { fetchProducts } from '../api/productApi'

function Collection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts({ tag: 'LIMITED' })
        setProducts(data.slice(0, 3))
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [])

  const handleSubscribe = async () => {
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/contact/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      setStatus(data.message)
      setEmail('')
    } catch {
      setStatus('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-black py-20 px-8">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-red-500 text-xs tracking-[0.4em] uppercase mb-10">
          The Collection
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 ">

          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="group cursor-pointer"
            >
              <div className="h-64 overflow-hidden rounded-lg border border-zinc-800 group-hover:border-red-500 transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-white text-xs tracking-widest uppercase font-bold">{product.name}</p>
                  <p className="text-zinc-400 text-xs mt-1">₦{product.price}.00</p>
                </div>
                {product.tag && (
                  <span className="bg-red-500 text-white text-[10px] rounded-lg tracking-widest px-2 py-1 uppercase">
                    {product.tag}
                  </span>
                )}
              </div>
            </Link>
          ))}

          {/* VIP Box */}
          <div className="border border-zinc-800 p-6 flex flex-col justify-center gap-4 rounded-lg">
            <div>
              <h3 className="text-white text-sm font-bold tracking-widest uppercase">VIP Verification</h3>
              <p className="text-zinc-500 text-xs tracking-wider mt-1">Signup for exclusive drops and accents.</p>
            </div>
            {status ? (
              <p className="text-green-500 text-xs tracking-wider">{status}</p>
            ) : (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-zinc-900 border rounded-lg border-zinc-700 text-white text-xs px-4 py-3 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className={`text-white text-xs tracking-[0.3em] rounded-lg uppercase py-3 transition-colors duration-300 ${
                    loading ? 'bg-zinc-700 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
                  }`}
                >
                  {loading ? 'Joining...' : '[ REQUEST ACCESS ]'}
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Collection