import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'
import rateLimit from 'express-rate-limit'
import 'express-async-errors'
import process from 'process'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import contactRoutes from './routes/contactRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'





dotenv.config()
connectDB()

const app = express()

app.set('trust proxy', 1)

// ── Security Headers ──────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}))

// ── CORS ──────────────────────────────────────────
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:4173',
      'https://hotshot-luxury.vercel.app',
      process.env.CLIENT_URL,
    ].filter(Boolean)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

// ── Body Parser ───────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

//  body parser middleware
app.use(cookieParser())

// ── Sanitize & Prevent Pollution ──────────────────
app.use(mongoSanitize())
app.use(hpp())

// ── Rate Limiters ─────────────────────────────────

// General API limiter — 100 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

// Auth limiter — 10 attempts per 15 minutes
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 10,
//   message: { message: 'Too many login attempts, please try again later' },
//   standardHeaders: true,
//   legacyHeaders: false,
// })

// Order limiter — 20 orders per hour
const orderLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { message: 'Too many orders placed, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
})

// ── Routes ────────────────────────────────────────
app.use('/api/auth',  authRoutes)
app.use('/api/products', apiLimiter, productRoutes)
app.use('/api/orders', orderLimiter, orderRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/reviews', apiLimiter, reviewRoutes)
app.use('/api/wishlist', apiLimiter, wishlistRoutes)
// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Hotshot Luxury API is running' })
})



// ── Error Handling ────────────────────────────────
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})