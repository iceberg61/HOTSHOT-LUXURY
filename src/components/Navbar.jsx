import { useState } from 'react'
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import CartDrawer from './CartDrawer'
import useAuthStore from '../store/authStore'
import SearchModal from './SearchModal'



const links = [
  { name: 'COLLECTION', path: '/shop' },
  { name: 'THE EXPERIENCE', path: '/experience' },
  { name: 'EXCLUSIVE DROP', path: '/shop' },
  { name: 'CONTACT', path: '/contact' },
]

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const totalItems = useCartStore((state) => state.getTotalItems())
  const location = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)

  // Close menu on route change
  const handleLinkClick = () => setMenuOpen(false)

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b border-zinc-900">

        {/* Main bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" onClick={handleLinkClick} className="text-white font-black text-xl tracking-wider">
            HOTSHOT <span className="text-red-500">//</span>
            <span className="block text-xs font-light tracking-[0.4em] text-zinc-400">LUXURY</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs tracking-widest transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-6">
            <button onClick={() => setSearchOpen(true)}>
              <Search className="text-zinc-400 hover:text-white cursor-pointer transition-colors hidden sm:block" size={18} />
            </button>
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-red-500 flex items-center justify-center rounded-full">
                    <span className="text-white text-xs font-black">
                      {user.firstName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </button>
                {/* Dropdown */}
                <div className="absolute right-0 top-8 w-48 bg-zinc-950 border border-zinc-800 hidden group-hover:flex flex-col z-50">
                  <p className="text-zinc-400 text-xs px-4 py-3 border-b border-zinc-800 tracking-wider">
                    {user.firstName} {user.lastName}
                  </p>
                  <Link to="/orders" onClick={handleLinkClick} className="text-zinc-400 text-xs px-4 py-3 hover:text-red-500 hover:bg-zinc-900 tracking-wider transition-colors">
                    My Orders
                  </Link>
                  {user.isAdmin && (
                    <Link to="/admin" onClick={handleLinkClick} className="text-zinc-400 text-xs px-4 py-3 hover:text-red-500 hover:bg-zinc-900 tracking-wider transition-colors border-t border-zinc-800">
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); handleLinkClick() }}
                    className="text-left text-zinc-400 text-xs px-4 py-3 hover:text-red-500 hover:bg-zinc-900 tracking-wider transition-colors border-t border-zinc-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" onClick={handleLinkClick}>
                <User className="text-zinc-400 hover:text-white cursor-pointer transition-colors" size={18} />
              </Link>
            )}
            <button onClick={() => setDrawerOpen(true)} className="relative">
              <ShoppingCart className="text-zinc-400 hover:text-white cursor-pointer transition-colors" size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen border-t border-zinc-900' : 'max-h-0'
        }`}>
          <div className="flex flex-col px-4 py-6 gap-1 bg-black">

            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={handleLinkClick}
                className={`py-3 px-4 text-xs tracking-widest uppercase border-b border-zinc-900 transition-colors duration-300 ${
                  location.pathname === link.path
                    ? 'text-red-500'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile extras */}
            <div className="flex flex-col gap-2 pt-6 px-4">
              {user ? (
                <>
                  <p className="text-zinc-600 text-xs tracking-wider px-4">
                    Hi, {user.firstName}
                  </p>
                  <Link
                    to="/orders"
                    onClick={handleLinkClick}
                    className="border border-zinc-700 text-zinc-400 text-xs tracking-widest uppercase py-3 text-center hover:border-white hover:text-white transition-all duration-300"
                  >
                    My Orders
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={handleLinkClick}
                      className="border border-red-500 text-red-500 text-xs tracking-widest uppercase py-3 text-center hover:bg-red-500 hover:text-black transition-all duration-300"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { logout(); handleLinkClick() }}
                    className="border border-zinc-700 text-zinc-400 text-xs tracking-widest uppercase py-3 text-center hover:border-red-500 hover:text-red-500 transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="flex-1 border border-zinc-700 text-zinc-400 text-xs tracking-widest uppercase py-3 text-center hover:border-white hover:text-white transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={handleLinkClick}
                    className="flex-1 bg-red-500 text-white text-xs tracking-widest uppercase py-3 text-center hover:bg-red-600 transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            {/* Search on mobile */}
            <div
              className="flex items-center border border-zinc-800 mt-4 mx-0 cursor-pointer"
              onClick={() => { setSearchOpen(true); setMenuOpen(false) }}
            >
              <div className="flex-1 text-zinc-600 text-xs px-4 py-3 tracking-wider">
                Search products...
              </div>
              <div className="px-4 py-3 text-zinc-400">
                <Search size={16} />
              </div>
            </div>

          </div>
        </div>

      </nav>

      <CartDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default Navbar