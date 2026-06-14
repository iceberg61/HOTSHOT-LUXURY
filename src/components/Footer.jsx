
import { useState } from 'react'
import { Link } from 'react-router-dom'
import API_URL from '../api/config'

function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState('')
  const [newsletterLoading, setNewsletterLoading] = useState(false)

  const handleNewsletter = async () => {
    if (!newsletterEmail) return
    setNewsletterLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/contact/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      })
      const data = await res.json()
      setNewsletterStatus(data.message)
      setNewsletterEmail('')
    } catch {
      setNewsletterStatus('Something went wrong. Try again.')
    } finally {
      setNewsletterLoading(false)
    }
  }

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto">

        {/* Top Section — 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          {/* Col 1 — Brand */}
          <div>
            <div className="text-white font-black text-xl tracking-wider mb-4">
              HOTSHOT <span className="text-red-500">//</span>
              <span className="block text-xs font-light tracking-[0.4em] text-zinc-400 mt-1">LUXURY</span>
            </div>
            <p className="text-zinc-500 text-xs leading-relaxed tracking-wider mb-6">
              Where high-octane attitude meets timeless luxury. Limited drops. Unapologetic style.
            </p>
            <div>
              <p className="text-zinc-600 text-xs tracking-widest uppercase mb-1">Address</p>
              <p className="text-zinc-400 text-xs tracking-wider">Abuja, Nigeria</p>
            </div>
          </div>

          {/* Col 2 — Shopping */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-6">
              Shopping
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'All Products', path: '/shop' },
                { name: 'New Arrivals', path: '/shop' },
                { name: 'Exclusive Drops', path: '/shop' },
                { name: 'Accessories', path: '/shop' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-zinc-500 text-xs tracking-wider hover:text-red-500 transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — About Store */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-6">
              About Store
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: 'About Us', path: '/experience' },
                { name: 'Size Guide', path: '/size-guide' },
                { name: 'Privacy Policy', path: '/privacy-policy' },
                { name: 'Returns & Refunds', path: '/returns' },
                { name: 'Help & FAQ', path: '/contact' },
                { name: 'Order Tracking', path: '/track-order' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-zinc-500 text-xs tracking-wider hover:text-red-500 transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Newsletter + Socials */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-2">
              Subscribe For <span className="text-red-500">Newsletter</span>
            </h4>
            <p className="text-zinc-600 text-xs tracking-wider mb-4">
              Get exclusive drops and offers first.
            </p>

            {/* Email Input */}
            {newsletterStatus ? (
              <p className="text-green-500 text-xs tracking-wider">{newsletterStatus}</p>
            ) : (
              <div className="flex items-center border rounded-lg border-zinc-700 hover:border-red-500 transition-colors duration-300 mb-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-transparent  text-white text-xs px-4 py-3 flex-1 placeholder-zinc-600 focus:outline-none tracking-wider"
                />
                <button
                  onClick={handleNewsletter}
                  disabled={newsletterLoading}
                  className="px-4 py-3 text-zinc-400 hover:text-red-500 transition-colors duration-300"
                >
                  {newsletterLoading ? '...' : '→'}
                </button>
              </div>
            )}

            {/* Follow */}
            <h4 className="text-white text-xs font-bold tracking-[0.3em] uppercase mb-4">
              Follow
            </h4>
            <div className="flex items-center gap-3">

              {/* Snapchat */}
              <a href="https://snapchat.com/t/6N4EamL9" className="bg-zinc-800 rounded-lg hover:bg-red-500 p-2.5 transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 15.574c-.073.197-.44.339-.957.437-.1.019-.196.09-.234.236-.033.128-.012.302.073.513.107.264.157.504.157.712 0 .453-.213.724-.584.724-.183 0-.394-.049-.637-.107-.44-.098-.988-.232-1.694-.232-.422 0-.874.049-1.356.261-.605.264-1.122.72-1.625 1.163-.748.661-1.522 1.352-2.72 1.352s-1.972-.691-2.72-1.352c-.503-.443-1.02-.899-1.625-1.163-.482-.212-.934-.261-1.356-.261-.706 0-1.254.134-1.694.232-.243.058-.454.107-.637.107-.371 0-.584-.271-.584-.724 0-.208.05-.448.157-.712.085-.211.106-.385.073-.513-.038-.146-.134-.217-.234-.236-.517-.098-.884-.24-.957-.437-.058-.156-.012-.327.122-.424.757-.528 1.219-1.265 1.487-1.889.296-.689.42-1.189.478-1.408l-.919-.89c-.261-.253-.307-.643-.114-.941.146-.226.4-.361.676-.361.143 0 .286.038.418.118l.402.238v-.505c0-.95.258-1.979 1.102-2.932C7.653 5.589 9.637 5.5 9.943 5.5h.114c.306 0 2.29.089 3.677 1.624.844.953 1.102 1.982 1.102 2.932v.505l.402-.238c.132-.08.275-.118.418-.118.276 0 .53.135.676.361.193.298.147.688-.114.941l-.919.89c.058.219.182.719.478 1.408.268.624.73 1.361 1.487 1.889.134.097.18.268.13.424z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" className="bg-zinc-800 rounded-lg hover:bg-red-500 p-2.5 transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" className="bg-zinc-800 rounded-lg hover:bg-red-500 p-2.5 transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a href="https://www.tiktok.com/@hotshot_luxury?_r=1&_t=ZS-97Ce12Y324D" className="bg-zinc-800 rounded-lg hover:bg-red-500 p-2.5 transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="text-zinc-400 group-hover:text-white transition-colors" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-xs tracking-widest uppercase">
            Copyright © 2026 <span className="text-white font-bold">Hotshot Luxury</span>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { name: 'Privacy Policy', path: '/privacy-policy' },
              { name: 'Terms & Conditions', path: '/terms' },
              { name: 'Returns', path: '/returns' },
            ].map((item) => (
              <Link key={item.name} to={item.path} className="text-zinc-600 text-xs tracking-wider hover:text-red-500 transition-colors duration-300">
                {item.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer