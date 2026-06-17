import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, size, requestedQuantity = 1) => {
        const availableStock = product.countInStock || 0

        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item._id === product._id && item.size === size
          )

          let finalQuantity

          if (existingIndex !== -1) {
            const currentQty = state.items[existingIndex].quantity
            finalQuantity = Math.min(currentQty + requestedQuantity, availableStock)
          } else {
            finalQuantity = Math.min(requestedQuantity, availableStock)
          }

          if (finalQuantity <= 0) return state

          if (existingIndex !== -1) {
            const updatedItems = [...state.items]
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: finalQuantity
            }
            return { items: updatedItems }
          } else {
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

        set((state) => ({
          items: state.items.map((item) => {
            if (item._id === _id && item.size === size) {
              const maxAllowed = item.countInStock || 9999
              return { ...item, quantity: Math.min(newQuantity, maxAllowed) }
            }
            return item
          })
        }))
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

      getTotalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),

    {
      name: 'hotshot-cart-storage',      
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useCartStore