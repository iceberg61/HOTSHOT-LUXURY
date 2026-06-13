import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

function NotFound() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO title="404 — Page Not Found" />
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="text-center">
          <p className="text-red-500 text-[8rem] sm:text-[12rem] font-black leading-none">
            404
          </p>
          <h1 className="text-white text-2xl sm:text-4xl font-black uppercase tracking-wider mb-4">
            Page Not Found
          </h1>
          <p className="text-zinc-500 text-sm tracking-wider leading-relaxed mb-10 max-w-md mx-auto">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/"
              className="bg-red-500 text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-red-600 transition-all duration-300"
            >
              Back to Home
            </Link>
            <Link
              to="/shop"
              className="border border-zinc-700 text-zinc-400 text-xs tracking-[0.3em] uppercase px-8 py-4 hover:border-white hover:text-white transition-all duration-300"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default NotFound