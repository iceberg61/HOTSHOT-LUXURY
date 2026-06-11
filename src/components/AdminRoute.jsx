import { Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

function AdminRoute({ children }) {
  const { user } = useAuthStore()

  if (!user) return <Navigate to="/login" />
  if (!user.isAdmin) return <Navigate to="/" />

  return children
}

export default AdminRoute