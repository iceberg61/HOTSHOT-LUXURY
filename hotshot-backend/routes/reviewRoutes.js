import express from 'express'
import { getProductReviews, createReview, deleteReview, getAllReviews} from '../controllers/reviewController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import process from 'process'

const router = express.Router()

const optionalAuth = async (req, res, next) => {
  let token
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      const jwt = await import('jsonwebtoken')
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.default.verify(token, process.env.JWT_SECRET)
      const User = (await import('../models/User.js')).default
      req.user = await User.findById(decoded.id).select('-password')
    } catch {
      req.user = null
    }
  }
  next()
}

router.get('/', protect, admin, getAllReviews)
router.get('/:productId', getProductReviews)
router.post('/:productId', optionalAuth, createReview)
router.delete('/:id', protect, admin, deleteReview)

export default router