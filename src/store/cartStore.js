import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],

  addToCart: (product, size, requestedQuantity = 1) => {
    const availableStock = product.countInStock || 0

    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item._id === product._id && item.size === size
      )

      let finalQuantity

      if (existingIndex !== -1) {
        // Item already in cart
        const currentQty = state.items[existingIndex].quantity
        finalQuantity = Math.min(currentQty + requestedQuantity, availableStock)
      } else {
        // New item
        finalQuantity = Math.min(requestedQuantity, availableStock)
      }

      if (finalQuantity <= 0) return state // Nothing to add

      if (existingIndex !== -1) {
        // Update existing
        const updatedItems = [...state.items]
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: finalQuantity
        }
        return { items: updatedItems }
      } else {
        // Add new item
        return {
          items: [
            ...state.items,
            { ...product, size, quantity: finalQuantity }
          ]
        }
      }
    })
  },

  removeFromCart: (_id, size) => {
    set({
      items: get().items.filter((item) => !(item._id === _id && item.size === size))
    })
  },

  updateQuantity: (_id, size, newQuantity) => {
    if (newQuantity < 1) return

    set((state) => {
      return {
        items: state.items.map((item) => {
          if (item._id === _id && item.size === size) {
            const maxAllowed = item.countInStock || 9999
            return { ...item, quantity: Math.min(newQuantity, maxAllowed) }
          }
          return item
        })
      }
    })
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

  getTotalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
}))

export default useCartStore