import { useState, useEffect } from 'react'
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react'
import AdminLayout from './AdminLayout'
import useAuthStore from '../../store/authStore'
import { getAllOrders, getAllUsers } from '../../api/adminApi'

function AdminOverview() {
  const { user } = useAuthStore()
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [ordersData, usersData] = await Promise.all([
          getAllOrders(user.token),
          getAllUsers(user.token),
        ])
        setOrders(ordersData)
        setUsers(usersData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'paid')
    .reduce((acc, o) => acc + o.totalPrice, 0)

  const pendingOrders = orders.filter((o) => o.status === 'processing').length

  const stats = [
    { label: 'Total Revenue', value: `₦${totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Pending Orders', value: pendingOrders, icon: TrendingUp, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Customers', value: users.length, icon: Users, color: 'text-red-500', bg: 'bg-red-500/10' },
  ]

  const statusColors = {
    processing: 'text-yellow-500',
    confirmed: 'text-blue-500',
    shipped: 'text-purple-500',
    delivered: 'text-green-500',
    cancelled: 'text-red-500',
  }

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">

        <div>
          <h1 className="text-white text-xl sm:text-2xl font-black uppercase tracking-wider">Overview</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">Welcome back, {user?.firstName}</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="bg-black border border-zinc-800 p-4">
                    <div className={`w-8 h-8 ${stat.bg} flex items-center justify-center mb-3`}>
                      <Icon size={16} className={stat.color} />
                    </div>
                    <p className={`text-xl sm:text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    <p className="text-zinc-500 text-xs tracking-wider mt-1">{stat.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Recent Orders */}
            <div className="bg-black border border-zinc-800">
              <div className="px-4 sm:px-6 py-4 border-b border-zinc-800">
                <h2 className="text-white text-sm font-black tracking-[0.3em] uppercase">Recent Orders</h2>
              </div>

              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-800">
                      <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Order ID</th>
                      <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Customer</th>
                      <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Total</th>
                      <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Status</th>
                      <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 8).map((order) => (
                      <tr key={order._id} className="border-b border-zinc-900 hover:bg-zinc-950 transition-colors">
                        <td className="px-6 py-4 text-white text-xs font-bold">
                          #{order._id.slice(-8).toUpperCase()}
                        </td>
                        <td className="px-6 py-4 text-zinc-400 text-xs">
                          {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                        </td>
                        <td className="px-6 py-4 text-red-500 text-xs font-bold">
                          ₦{order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs tracking-widest uppercase font-bold ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-zinc-400 text-xs">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden flex flex-col divide-y divide-zinc-900">
                {orders.slice(0, 8).map((order) => (
                  <div key={order._id} className="px-4 py-4 flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-bold">#{order._id.slice(-8).toUpperCase()}</p>
                      <p className="text-zinc-500 text-xs mt-1 truncate">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      </p>
                      <p className="text-zinc-600 text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-red-500 text-xs font-bold">₦{order.totalPrice.toFixed(2)}</p>
                      <p className={`text-xs font-bold uppercase mt-1 ${statusColors[order.status]}`}>
                        {order.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminOverview