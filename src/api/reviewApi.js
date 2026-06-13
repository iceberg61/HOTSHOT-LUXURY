import API_URL from './config'

export const getProductReviews = async (productId) => {
  const res = await fetch(`${API_URL}/api/reviews/${productId}`)
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}

export const createReview = async (productId, reviewData) => {
  const res = await fetch(`${API_URL}/api/reviews/${productId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  return data
}