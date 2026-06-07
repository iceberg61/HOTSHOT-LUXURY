import { Search, User, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'

const links = [
  { name: 'COLLECTION', path: '/shop' },
  { name: 'THE EXPERIENCE', path: '/experience' },
  { name: 'EXCLUSIVE DROP', path: '/shop' },
  { name: 'CONTACT', path: '/contact' },
]

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-zinc-900 px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-white font-black text-xl tracking-wider">
          HOTSHOT <span className="text-red-500">//</span>
          <span className="block text-xs font-light tracking-[0.4em] text-zinc-400">LUXURY</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-zinc-400 text-xs tracking-widest hover:text-white transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          <Search className="text-zinc-400 hover:text-white cursor-pointer transition-colors" size={18} />
          <User className="text-zinc-400 hover:text-white cursor-pointer transition-colors" size={18} />
          <div className="relative">
            <ShoppingCart className="text-zinc-400 hover:text-white cursor-pointer transition-colors" size={18} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              0
            </span>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar