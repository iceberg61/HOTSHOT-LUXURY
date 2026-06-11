import API_URL from './config'

const authHeader = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

// Orders
export const getAllOrders = async (token) => {
  const res = await fetch(`${API_URL}/api/orders`, {
    headers: authHeader(token),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to fetch orders')
  return data
}

export const updateOrderStatus = async (token, orderId, status) => {
  const res = await fetch(`${API_URL}/api/orders/${orderId}/status`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify({ status }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to update order')
  return data
}

export const createProduct = async (token, productData) => {
  const res = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: authHeader(token),
    body: JSON.stringify(productData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to create product')
  return data
}

export const updateProduct = async (token, productId, productData) => {
  const res = await fetch(`${API_URL}/api/products/${productId}`, {
    method: 'PUT',
    headers: authHeader(token),
    body: JSON.stringify(productData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to update product')
  return data
}

export const deleteProduct = async (token, productId) => {
  const res = await fetch(`${API_URL}/api/products/${productId}`, {
    method: 'DELETE',
    headers: authHeader(token),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to delete product')
  return data
}

export const getAllUsers = async (token) => {
  const res = await fetch(`${API_URL}/api/auth/users`, {
    headers: authHeader(token),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to fetch users')
  return data
}