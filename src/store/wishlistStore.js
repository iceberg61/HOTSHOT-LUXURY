import { create } from 'zustand'
import { getWishlist, addToWishlist, removeFromWishlist } from '../api/wishlistApi'

const useWishlistStore = create((set, get) => ({
  items: [],

  fetchWishlist: async (token) => {
    try {
      const data = await getWishlist(token)
      set({ items: data })
    } catch (err) {
      console.error(err)
    }
  },

  addItem: async (token, productId) => {
    try {
      await addToWishlist(token, productId)
      // Add optimistically
      set({ items: [...get().items, { _id: productId }] })
    } catch (err) {
      console.error(err)
    }
  },

  removeItem: async (token, productId) => {
    try {
      await removeFromWishlist(token, productId)
      set({
        items: get().items.filter((i) => {
          const itemId = i._id?._id || i._id
          return itemId?.toString() !== productId?.toString()
        })
      })
    } catch (err) {
      console.error(err)
    }
  },

  isWishlisted: (productId) => {
    if (!productId) return false
    return get().items.some((i) => {
      const itemId = i._id?._id || i._id
      return itemId?.toString() === productId?.toString()
    })
  },
}))

export default useWishlistStore