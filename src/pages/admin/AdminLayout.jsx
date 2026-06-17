import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { LayoutDashboard, ShoppingBag, Package, Users, MessageSquare, Star, LogOut, Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'Overview', path: '/admin', icon: LayoutDashboard },
  { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Customers', path: '/admin/customers', icon: Users },
  { name: 'Contacts', path: '/admin/contacts', icon: MessageSquare },
  { name: 'Reviews', path: '/admin/reviews', icon: Star },
]

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="bg-zinc-950 min-h-screen flex">

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-black border-r border-zinc-800 z-50 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>

        {/* Logo */}
        <div className="px-6 py-6 border-b border-zinc-800">
          <Link to="/" className="text-white font-black text-lg tracking-wider">
            HOTSHOT <span className="text-red-500">//</span>
            <span className="block text-xs font-light tracking-[0.4em] text-zinc-400 mt-1">ADMIN</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center rounded-lg gap-3 px-4 py-3 text-xs tracking-widest uppercase transition-all duration-300 ${
                  active
                    ? 'bg-red-500 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon size={16} />
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-6 border-t border-zinc-800">
          <div className="flex items-center gap-3 mb-4 px-4">
            <div className="w-8 h-8 bg-red-500 flex items-center justify-center shrink-0 rounded-lg">
              <span className="text-white text-xs font-black">
                {user?.firstName?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-white text-xs font-bold tracking-wider">
                {user?.firstName} 
              </p>
              <p className="text-zinc-600 text-xs tracking-wider">Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-zinc-400 text-xs rounded-lg tracking-widest uppercase hover:text-red-500 hover:bg-zinc-900 transition-all duration-300"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col">

        {/* Top bar */}
        <div className="bg-black border-b border-zinc-800 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-zinc-400 hover:text-white transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <p className="text-zinc-400 text-xs tracking-widest uppercase">
            {navLinks.find((l) => l.path === location.pathname)?.name || 'Admin'}
          </p>
          <Link
            to="/"
            className="text-zinc-600 text-xs tracking-wider hover:text-red-500 transition-colors"
          >
            View Store →
          </Link>
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          {children}
        </div>

      </div>

    </div>
  )
}

export default AdminLayout