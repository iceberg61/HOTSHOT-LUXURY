import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import useAuthStore from '../../store/authStore'
import { getAllOrders, updateOrderStatus } from '../../api/adminApi'

const statusOptions = ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled']

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

function AdminOrders() {
  const { user } = useAuthStore()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllOrders(user.token)
        setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  const handleStatusUpdate = async (orderId, status) => {
    setUpdatingId(orderId)
    try {
      const updated = await updateOrderStatus(user.token, orderId, status)
      setOrders(orders.map((o) => o._id === orderId ? { ...o, status: updated.status } : o))
    } catch (err) {
      console.error(err)
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">

        <div>
          <h1 className="text-white text-xl sm:text-2xl font-black uppercase tracking-wider">Orders</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">{orders.length} total orders</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2  border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div key={order._id} className="bg-black border rounded-lg border-zinc-800">

                {/* Order Row */}
                <div
                  className="px-4 sm:px-6 py-4 cursor-pointer hover:bg-zinc-950 transition-colors"
                  onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="text-white text-xs font-bold">
                          #{order._id.slice(-8).toUpperCase()}
                        </p>
                        <span className={`text-xs font-bold rounded-lg uppercase border px-2 py-0.5 ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                        <span className={`text-xs font-bold  uppercase ${paymentColors[order.paymentStatus]}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-xs mt-1 truncate">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName} · {order.shippingAddress.email}
                      </p>
                      <p className="text-zinc-600 text-xs mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <p className="text-red-500 text-sm font-black">₦{order.totalPrice.toFixed(2)}</p>
                      <span className="text-zinc-600 text-xs">
                        {expandedId === order._id ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Expanded */}
                {expandedId === order._id && (
                  <div className="border-t border-zinc-800 px-4 sm:px-6 py-6 bg-zinc-950">
                    <div className="flex flex-col gap-6">

                      {/* Items */}
                      <div>
                        <p className="text-zinc-500 text-xs tracking-widest uppercase mb-3">Items</p>
                        <div className="flex flex-col gap-3">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800">
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-white text-xs font-bold uppercase truncate">{item.name}</p>
                                <p className="text-zinc-500 text-xs">Size: {item.size} · Qty: {item.quantity}</p>
                              </div>
                              <p className="text-red-500 text-xs font-bold shrink-0">
                                ₦{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping */}
                      <div>
                        <p className="text-zinc-500 text-xs tracking-widest uppercase mb-3">Shipping Address</p>
                        <p className="text-zinc-400 text-xs leading-relaxed">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                          {order.shippingAddress.address}<br />
                          {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                          {order.shippingAddress.country}<br />
                          {order.shippingAddress.phone}
                        </p>
                      </div>

                      {/* Update Status */}
                      <div>
                        <p className="text-zinc-500 text-xs tracking-widest uppercase mb-3">Update Status</p>
                        <div className="flex flex-wrap gap-2">
                          {statusOptions.map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusUpdate(order._id, status)}
                              disabled={updatingId === order._id || order.status === status}
                              className={`px-3 py-2 text-xs tracking-widest uppercase border rounded-lg transition-all duration-300 ${
                                order.status === status
                                  ? 'bg-red-500 border-red-500 text-white'
                                  : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
                              } ${updatingId === order._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              {status}
                            </button>
                          ))}
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
    </AdminLayout>
  )
}

export default AdminOrders