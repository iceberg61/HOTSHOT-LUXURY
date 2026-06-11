import { useState, useEffect } from 'react'
import AdminLayout from './AdminLayout'
import useAuthStore from '../../store/authStore'
import { getAllUsers } from '../../api/adminApi'

function AdminCustomers() {
  const { user } = useAuthStore()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllUsers(user.token)
        setUsers(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [user])

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">

        <div>
          <h1 className="text-white text-xl sm:text-2xl font-black uppercase tracking-wider">Customers</h1>
          <p className="text-zinc-500 text-xs tracking-wider mt-1">{users.length} registered customers</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-black border border-zinc-800 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800">
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Name</th>
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Email</th>
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Role</th>
                    <th className="text-left px-6 py-3 text-zinc-600 text-xs tracking-widest uppercase">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b border-zinc-900 hover:bg-zinc-950 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-500 flex items-center justify-center shrink-0">
                            <span className="text-white text-xs font-black">
                              {u.firstName?.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <p className="text-white text-xs font-bold">{u.firstName} {u.lastName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 text-xs">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold uppercase ${u.isAdmin ? 'text-red-500' : 'text-zinc-400'}`}>
                          {u.isAdmin ? 'Admin' : 'Customer'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-zinc-400 text-xs">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden flex flex-col gap-3">
              {users.map((u) => (
                <div key={u._id} className="bg-black border border-zinc-800 p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-500 flex items-center justify-center shrink-0">
                    <span className="text-white text-sm font-black">
                      {u.firstName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-bold">{u.firstName} {u.lastName}</p>
                    <p className="text-zinc-500 text-xs mt-1 truncate">{u.email}</p>
                    <p className="text-zinc-600 text-xs mt-1">
                      Joined {new Date(u.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs font-bold uppercase shrink-0 ${u.isAdmin ? 'text-red-500' : 'text-zinc-500'}`}>
                    {u.isAdmin ? 'Admin' : 'Customer'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  )
}

export default AdminCustomers