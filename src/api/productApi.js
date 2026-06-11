import API_URL from './config'

// Get all products
export const fetchProducts = async ({ category, sort, maxPrice } = {}) => {
  const params = new URLSearchParams()
  if (category && category !== 'ALL') params.append('category', category)
  if (sort && sort !== 'Default') params.append('sort', sort)
  if (maxPrice) params.append('maxPrice', maxPrice)

  const res = await fetch(`${API_URL}/api/products?${params}`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json()
}

// Get single product
export const fetchProductById = async (id) => {
  const res = await fetch(`${API_URL}/api/products/${id}`)
  if (!res.ok) throw new Error('Product not found')
  return res.json()
}