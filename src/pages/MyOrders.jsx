import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useAuthStore from '../store/authStore'
import { getMyOrders } from '../api/orderApi'

const statusColors = {
  processing: 'text-yellow-500 border-yellow-500',
  confirmed: 'text-blue-500 border-blue-500',
  shipped: 'text-purple-500 border-purple-500',
  delivered: 'text-green-500 border-green-500',
  cancelled: 'text-red-500 border-red-500',
}

const paymentColors = {
  pending: 'text-yellow-500',
  paid: 'text-green-500',
  failed: 'text-red-500',
}

function MyOrders() {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [expandedId, setExpandedId] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    const loadOrders = async () => {
      try {
        setLoading(true)
        const data = await getMyOrders(user.token)
        setOrders(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [user, navigate])

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[5rem] sm:text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            ORDERS
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-black uppercase">
            My <span className="text-red-500">Orders</span>
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">My Orders</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 sm:py-16">

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-zinc-600 text-xs tracking-widest uppercase">Loading orders...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-red-500 text-xs tracking-widest uppercase">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="border border-red-500 text-red-500 text-xs tracking-widest uppercase px-6 py-3 hover:bg-red-500 hover:text-black transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <p className="text-zinc-600 text-xs tracking-widest uppercase">No orders yet</p>
            <Link
              to="/shop"
              className="bg-red-500 text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-red-600 transition-all duration-300"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders List */}
        {!loading && !error && orders.length > 0 && (
          <div className="flex flex-col gap-4">

            {/* Table Header — desktop only */}
            <div className="hidden md:grid grid-cols-6 gap-4 pb-4 border-b border-zinc-800">
              <p className="text-zinc-600 text-xs tracking-widest uppercase col-span-2">Order ID</p>
              <p className="text-zinc-600 text-xs tracking-widest uppercase">Date</p>
              <p className="text-zinc-600 text-xs tracking-widest uppercase">Total</p>
              <p className="text-zinc-600 text-xs tracking-widest uppercase">Payment</p>
              <p className="text-zinc-600 text-xs tracking-widest uppercase">Status</p>
            </div>

            {orders.map((order) => (
              <div key={order._id} className="border border-zinc-800 hover:border-zinc-700 transition-colors duration-300">

                {/* Order Row */}
                <div
                  className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                >
                  {/* Order ID */}
                  <div className="col-span-2 md:col-span-2">
                    <p className="text-zinc-500 text-xs tracking-wider md:hidden mb-1">Order ID</p>
                    <p className="text-white text-xs font-bold tracking-wider break-all">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>

                  {/* Date */}
                  <div>
                    <p className="text-zinc-500 text-xs tracking-wider md:hidden mb-1">Date</p>
                    <p className="text-zinc-400 text-xs tracking-wider">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric'
                      })}
                    </p>
                  </div>

                  {/* Total */}
                  <div>
                    <p className="text-zinc-500 text-xs tracking-wider md:hidden mb-1">Total</p>
                    <p className="text-red-500 text-xs font-bold">
                      ₦{order.totalPrice.toFixed(2)}
                    </p>
                  </div>

                  {/* Payment */}
                  <div>
                    <p className="text-zinc-500 text-xs tracking-wider md:hidden mb-1">Payment</p>
                    <p className={`text-xs tracking-widest uppercase font-bold ${paymentColors[order.paymentStatus]}`}>
                      {order.paymentStatus}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-zinc-500 text-xs tracking-wider md:hidden mb-1">Status</p>
                      <span className={`text-xs tracking-widest uppercase font-bold border px-2 py-1 ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <span className="text-zinc-600 text-xs ml-auto">
                      {expandedId === order._id ? '▲' : '▼'}
                    </span>
                  </div>

                </div>

                {/* Expanded — Order Items */}
                {expandedId === order._id && (
                  <div className="border-t border-zinc-800 p-4 bg-zinc-950">
                    <p className="text-zinc-500 text-xs tracking-widest uppercase mb-4">
                      Order Items
                    </p>
                    <div className="flex flex-col gap-4 mb-6">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-white text-xs font-bold tracking-wider uppercase">{item.name}</p>
                            <p className="text-zinc-500 text-xs mt-1">Size: {item.size} · Qty: {item.quantity}</p>
                          </div>
                          <p className="text-red-500 text-xs font-bold shrink-0">
                            ₦{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="border-t border-zinc-800 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-zinc-500 text-xs tracking-widest uppercase mb-3">
                          Shipping Address
                        </p>
                        <p className="text-white text-xs tracking-wider leading-relaxed">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                          {order.shippingAddress.address}<br />
                          {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                          {order.shippingAddress.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-zinc-500 text-xs tracking-widest uppercase mb-3">
                          Order Info
                        </p>
                        <div className="flex flex-col gap-2">
                          <p className="text-zinc-400 text-xs tracking-wider">
                            <span className="text-zinc-600">Payment: </span>
                            {order.paymentMethod === 'card' ? 'Credit / Debit Card' : 'Bank Transfer'}
                          </p>
                          <p className="text-zinc-400 text-xs tracking-wider">
                            <span className="text-zinc-600">Order Total: </span>
                            <span className="text-red-500 font-bold">₦{order.totalPrice.toFixed(2)}</span>
                          </p>
                          <p className="text-zinc-400 text-xs tracking-wider">
                            <span className="text-zinc-600">Full Order ID: </span>
                            <span className="break-all">{order._id}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default MyOrders