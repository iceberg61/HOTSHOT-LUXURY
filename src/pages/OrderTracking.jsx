import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'
import API_URL from '../api/config'

const statusSteps = ['processing', 'confirmed', 'shipped', 'delivered']

const statusInfo = {
  processing: { label: 'Processing', desc: 'We have received your order and are preparing it.', color: 'text-yellow-500', bg: 'bg-yellow-500' },
  confirmed: { label: 'Confirmed', desc: 'Your order has been confirmed and is being packed.', color: 'text-blue-500', bg: 'bg-blue-500' },
  shipped: { label: 'Shipped', desc: 'Your order is on its way to you.', color: 'text-purple-500', bg: 'bg-purple-500' },
  delivered: { label: 'Delivered', desc: 'Your order has been delivered successfully.', color: 'text-green-500', bg: 'bg-green-500' },
  cancelled: { label: 'Cancelled', desc: 'This order has been cancelled.', color: 'text-red-500', bg: 'bg-red-500' },
}

const paymentInfo = {
  pending: { label: 'Pending', color: 'text-yellow-500' },
  paid: { label: 'Paid', color: 'text-green-500' },
  failed: { label: 'Failed', color: 'text-red-500' },
}

function OrderTracking() {
  const [orderId, setOrderId] = useState('')
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleTrack = async () => {
    if (!orderId.trim()) {
      setError('Please enter an order ID')
      return
    }
    setLoading(true)
    setError('')
    setOrder(null)
    try {
      const res = await fetch(`${API_URL}/api/orders/track/${orderId.trim()}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setOrder(data)
    } catch (err) {
      setError(err.message || 'Order not found. Please check your order ID.')
    } finally {
      setLoading(false)
    }
  }

  const currentStep = order ? statusSteps.indexOf(order.status) : -1

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO title="Track Your Order" url="/track-order" />
      <Navbar />

      {/* Hero */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[4rem] sm:text-[8rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            TRACKING
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl font-black uppercase">
            Track <span className="text-red-500">Order</span>
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Track Order</span>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-8 py-16">

        {/* Search Box */}
        <div className="bg-zinc-950 border border-zinc-800 p-6 sm:p-8 mb-10">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-2">Order Lookup</p>
          <h2 className="text-white text-xl font-black uppercase tracking-wider mb-6">
            Enter Your Order ID
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={orderId}
              onChange={(e) => { setOrderId(e.target.value); setError('') }}
              onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
              placeholder="e.g. 6a2773fdab3acb489618fd6e"
              className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-xs px-5 py-4 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
            />
            <button
              onClick={handleTrack}
              disabled={loading}
              className={`flex items-center justify-center gap-2 text-xs tracking-[0.3em] uppercase px-8 py-4 transition-all duration-300 shrink-0 ${
                loading
                  ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              <Search size={14} />
              {loading ? 'Searching...' : 'Track'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-xs tracking-wider mt-3">{error}</p>
          )}
          <p className="text-zinc-600 text-xs tracking-wider mt-4">
            You can find your order ID in your confirmation email or on the order confirmation page.
          </p>
        </div>

        {/* Order Result */}
        {order && (
          <div className="flex flex-col gap-6">

            {/* Order Header */}
            <div className="bg-zinc-950 border border-zinc-800 p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">Order ID</p>
                  <p className="text-white text-xs font-bold break-all">#{order._id.slice(-12).toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">Date</p>
                  <p className="text-white text-xs">{new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">Total</p>
                  <p className="text-red-500 text-sm font-black">₦{order.totalPrice.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-zinc-500 text-xs tracking-widest uppercase mb-1">Payment</p>
                  <p className={`text-xs font-bold uppercase ${paymentInfo[order.paymentStatus]?.color}`}>
                    {paymentInfo[order.paymentStatus]?.label}
                  </p>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            {order.status !== 'cancelled' ? (
              <div className="bg-zinc-950 border border-zinc-800 p-6">
                <p className="text-white text-sm font-black uppercase tracking-wider mb-8">Order Status</p>

                {/* Progress bar */}
                <div className="relative mb-8">
                  <div className="absolute top-3 left-0 w-full h-0.5 bg-zinc-800" />
                  <div
                    className="absolute top-3 left-0 h-0.5 bg-red-500 transition-all duration-500"
                    style={{ width: currentStep >= 0 ? `${(currentStep / (statusSteps.length - 1)) * 100}%` : '0%' }}
                  />
                  <div className="relative flex justify-between">
                    {statusSteps.map((step, i) => (
                      <div key={step} className="flex flex-col items-center gap-2">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          i <= currentStep
                            ? 'bg-red-500 border-red-500'
                            : 'bg-zinc-950 border-zinc-700'
                        }`}>
                          {i < currentStep && (
                            <span className="text-white text-xs">✓</span>
                          )}
                          {i === currentStep && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <p className={`text-xs uppercase tracking-wider text-center ${
                          i <= currentStep ? 'text-white font-bold' : 'text-zinc-600'
                        }`}>
                          {statusInfo[step]?.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current status message */}
                <div className="bg-zinc-900 border border-zinc-800 p-4">
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${statusInfo[order.status]?.color}`}>
                    {statusInfo[order.status]?.label}
                  </p>
                  <p className="text-zinc-400 text-xs tracking-wider">
                    {statusInfo[order.status]?.desc}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-950 border border-red-500/30 p-6">
                <p className="text-red-500 text-sm font-black uppercase tracking-wider mb-2">Order Cancelled</p>
                <p className="text-zinc-400 text-xs tracking-wider">
                  This order has been cancelled. If you have any questions, please contact us.
                </p>
              </div>
            )}

            {/* Items */}
            <div className="bg-zinc-950 border border-zinc-800 p-6">
              <p className="text-white text-sm font-black uppercase tracking-wider mb-6">Items Ordered</p>
              <div className="flex flex-col gap-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 border-b border-zinc-900 pb-4 last:border-0 last:pb-0">
                    <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-bold uppercase tracking-wider truncate">{item.name}</p>
                      <p className="text-zinc-500 text-xs mt-1">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className="text-red-500 text-xs font-bold shrink-0">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-zinc-950 border border-zinc-800 p-6">
              <p className="text-white text-sm font-black uppercase tracking-wider mb-4">Shipping To</p>
              <p className="text-zinc-400 text-xs tracking-wider leading-relaxed">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                {order.shippingAddress.country}
              </p>
            </div>

            {/* Help */}
            <div className="flex items-center gap-4 flex-wrap">
              <Link
                to="/contact"
                className="border border-zinc-700 text-zinc-400 text-xs tracking-[0.3em] uppercase px-6 py-3 hover:border-white hover:text-white transition-all duration-300"
              >
                Need Help?
              </Link>
              <Link
                to="/shop"
                className="bg-red-500 text-white text-xs tracking-[0.3em] uppercase px-6 py-3 hover:bg-red-600 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default OrderTracking