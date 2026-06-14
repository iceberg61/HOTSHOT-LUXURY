import { useState } from 'react'
import API_URL from '../api/config'

function CTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

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
    <section className="bg-red-500 py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden">

      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p className="text-red-400 text-[5rem] sm:text-[12rem] font-black uppercase tracking-widest opacity-20 whitespace-nowrap">
          HOTSHOT
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

        {/* Left — Text */}
        <div className="max-w-lg">
          <p className="text-red-200 text-xs tracking-[0.4em] uppercase mb-3">
            Don't Miss The Drop
          </p>
          <h2 className="text-black text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-none mb-4">
            Be First. <br /> Always.
          </h2>
          <p className="text-red-900 text-sm tracking-wider leading-relaxed">
            Join the VIP list and get exclusive early access to every drop, limited releases and members-only offers — before anyone else.
          </p>
        </div>

        {/* Right — Email signup */}
        <div className="w-full lg:w-auto lg:min-w-95">
          {status ? (
            <div className="bg-black/20 border  border-black/20 px-6 py-8 text-center">
              <p className="text-black text-2xl font-black uppercase mb-2">You're In. ✓</p>
              <p className="text-red-900 text-xs tracking-wider">{status}</p>
            </div>
          ) : (
            <div className="bg-black/10 border rounded-lg border-black/20 p-6 sm:p-8">
              <p className="text-black text-sm font-black uppercase tracking-wider mb-6">
                Join The VIP List
              </p>
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  placeholder="Enter your email address"
                  className="w-full bg-black rounded-lg text-white text-xs px-5 py-4 tracking-wider placeholder-zinc-500 focus:outline-none border border-transparent focus:border-white transition-colors"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className={`w-full text-xs rounded-lg tracking-[0.3em] uppercase py-4 font-bold transition-all duration-300 ${
                    loading
                      ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-zinc-900'
                  }`}
                >
                  {loading ? 'Joining...' : '[ REQUEST VIP ACCESS ]'}
                </button>
              </div>
              <p className="text-red-900 text-xs tracking-wider mt-4 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default CTA