import express from 'express'
import {
    register,
    login,
  logout,
  getProfile,
  updateProfile,
  getAllUsers,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from '../controllers/authController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import rateLimit from 'express-rate-limit'

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

const router = express.Router()

// Public — with auth rate limiter applied in server.js
router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.post('/logout', logout)

// Password reset — no rate limiter needed here
router.post('/forgot-password', forgotPassword)
router.post('/verify-otp', verifyOTP)
router.post('/reset-password', resetPassword)

// Protected
router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.get('/users', protect, admin, getAllUsers)

export default router





