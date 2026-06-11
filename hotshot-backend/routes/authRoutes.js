import express from 'express'
import { register, login, getProfile, updateProfile, getAllUsers } from '../controllers/authController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/profile', protect, getProfile)
router.put('/profile', protect, updateProfile)
router.get('/users', protect, admin, getAllUsers)

export default router

