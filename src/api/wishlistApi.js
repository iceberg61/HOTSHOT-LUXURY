import API_URL from './config'

const authHeader = (token) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
})

export const getWishlist = async (token) => {
  const res = await fetch(`${API_URL}/api/wishlist`, {
    headers: authHeader(token),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const addToWishlist = async (token, productId) => {
  const res = await fetch(`${API_URL}/api/wishlist/${productId}`, {
    method: 'POST',
    headers: authHeader(token),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const removeFromWishlist = async (token, productId) => {
  const res = await fetch(`${API_URL}/api/wishlist/${productId}`, {
    method: 'DELETE',
    headers: authHeader(token),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}