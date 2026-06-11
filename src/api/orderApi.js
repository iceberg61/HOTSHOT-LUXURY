import API_URL from './config'

export const createOrder = async (orderData, token = null) => {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers,
    body: JSON.stringify(orderData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to create order')
  return data
}

export const verifyPayment = async (orderId, transactionId, token = null) => {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API_URL}/api/orders/${orderId}/verify-payment`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ transactionId }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Payment verification failed')
  return data
}

export const getMyOrders = async (token = null) => {
  const res = await fetch(`${API_URL}/api/orders/myorders`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to get orders')
  return data
}