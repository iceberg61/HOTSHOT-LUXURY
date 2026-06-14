import express from 'express'
import process from 'process'
import Order from '../models/Order.js'
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  verifyPayment,
  flutterwaveWebhook,
  saveTxRef,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

// Optional auth middleware
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

router.post('/webhook', flutterwaveWebhook)
router.post('/', optionalAuth, createOrder)
router.get('/myorders', protect, getMyOrders)

// @desc    Track order by ID — public
// @route   GET /api/orders/track/:id
// @access  Public
router.get('/track/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) {
      res.status(404).json({ message: 'Order not found' })
      return
    }
    res.json({
      _id: order._id,
      status: order.status,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      items: order.items,
      totalPrice: order.totalPrice,
      shippingAddress: {
        firstName: order.shippingAddress.firstName,
        lastName: order.shippingAddress.lastName,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        country: order.shippingAddress.country,
      },
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    })
  } catch {
    res.status(400).json({ message: 'Invalid order ID' })
  }
})

router.get('/', protect, admin, getAllOrders)
router.get('/:id', optionalAuth, getOrderById)
router.put('/:id/status', protect, admin, updateOrderStatus)
router.put('/:id/pay', protect, admin, updatePaymentStatus)
router.put('/:id/save-ref', optionalAuth, saveTxRef)
router.post('/:id/verify-payment', optionalAuth, verifyPayment)

export default router