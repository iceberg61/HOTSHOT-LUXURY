import Order from '../models/Order.js'
import process from 'process'
import { sendOrderConfirmationEmail } from '../utils/emailService.js'
// import Product from '../models/Product.js'

// @desc    Create order
// @route   POST /api/orders
// @access  Public (guest checkout allowed)
const createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod, totalPrice } = req.body

  if (!items || items.length === 0) {
    res.status(400).json({ message: 'No order items' })
    return
  }

  const order = await Order.create({
    user: req.user ? req.user._id : null,
    items,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentStatus: 'pending',
  })

  // Send confirmation email
  try {
    await sendOrderConfirmationEmail(order)
  } catch (err) {
    console.error('Order email error:', err)
  }

  res.status(201).json(order)
}

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json(orders)
}

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'firstName lastName email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  const orders = await Order.find({})
    .populate('user', 'firstName lastName email')
    .sort({ createdAt: -1 })
  res.json(orders)
}

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.status = req.body.status || order.status
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

// @desc    Update payment status
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
const updatePaymentStatus = async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.paymentStatus = req.body.paymentStatus || order.paymentStatus
    order.flutterwaveRef = req.body.flutterwaveRef || order.flutterwaveRef
    const updatedOrder = await order.save()
    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
}

// @desc    Verify Flutterwave payment
// @route   POST /api/orders/:id/verify-payment
// @access  Private
const verifyPayment = async (req, res) => {
  const { transactionId } = req.body
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404).json({ message: 'Order not found' })
    return
  }

  try {
    const response = await fetch(
      `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    )

    const data = await response.json()

    if (
      data.status === 'success' &&
      data.data.status === 'successful' &&
      data.data.amount >= order.totalPrice &&
      data.data.currency === 'NGN'
    ) {
      order.paymentStatus = 'paid'
      order.flutterwaveRef = transactionId
      order.status = 'confirmed'
      await order.save()
      res.json({ success: true, order })
    } else {
      order.paymentStatus = 'failed'
      await order.save()
      res.status(400).json({ message: 'Payment verification failed' })
    }
  } catch {
    res.status(500).json({ message: 'Payment verification error' })
  }
}

// @desc    Flutterwave webhook
// @route   POST /api/orders/webhook
// @access  Public (Flutterwave calls this)
const flutterwaveWebhook = async (req, res) => {
  const secretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET
  const signature = req.headers['verif-hash']

  if (signature !== secretHash) {
    res.status(401).json({ message: 'Invalid signature' })
    return
  }

  const payload = req.body
  console.log('Webhook received:', payload)

  const status = payload.status
  const txRef = payload.txRef
  const txId = payload.id

  if (status === 'successful') {
    try {
      // Find order by txRef stored in flutterwaveRef
      const order = await Order.findOne({
        flutterwaveRef: txRef,
        paymentStatus: { $in: ['pending', 'failed'] },
      })

      if (order) {
        order.paymentStatus = 'paid'
        order.flutterwaveRef = String(txId)
        order.status = 'confirmed'
        await order.save()
        console.log('Order confirmed via webhook:', order._id)
      } else {
        console.log('No matching order found for txRef:', txRef)
      }
    } catch (err) {
      console.error('Webhook order update error:', err)
    }
  }

  res.status(200).json({ received: true })
}

// @desc    Save flutterwave txRef to order
// @route   PUT /api/orders/:id/save-ref
// @access  Public
const saveTxRef = async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.flutterwaveRef = req.body.txRef
    await order.save()
    res.json({ success: true })
  } else {
    res.status(404).json({ message: 'Order not found' })
  }
}

export {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  verifyPayment,
  flutterwaveWebhook,
  saveTxRef,
}