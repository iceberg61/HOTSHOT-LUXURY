import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],

  addToCart: (product, size, quantity) => {
    const existing = get().items.find(
      (item) => item._id === product._id && item.size === size
    )
    if (existing) {
      set({
        items: get().items.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      })
    } else {
      set({ items: [...get().items, { ...product, size, quantity }] })
    }
  },

  removeFromCart: (_id, size) => {
    set({ items: get().items.filter((item) => !(item._id === _id && item.size === size)) })
  },

  updateQuantity: (_id, size, quantity) => {
    if (quantity < 1) return
    set({
      items: get().items.map((item) =>
        item._id === _id && item.size === size
          ? { ...item, quantity }
          : item
      ),
    })
  },

  clearCart: () => set({ items: [] }),

  getTotalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),

  getTotalPrice: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
}))

export default useCartStore