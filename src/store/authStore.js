import { create } from 'zustand'

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('hotshotUser')) || null,

  setUser: (user) => {
    localStorage.setItem('hotshotUser', JSON.stringify(user))
    set({ user })
  },

  logout: async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      })
    } catch (err) {
      console.error(err)
    }
    localStorage.removeItem('hotshotUser')
    set({ user: null })
  },
}))

export default useAuthStore