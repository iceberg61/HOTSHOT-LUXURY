import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import process from 'process'

const protect = async (req, res, next) => {
  let token

  // Check cookie first
  if (req.cookies?.token) {
    token = req.cookies.token
  }
  // Fall back to Authorization header
  else if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    next()
  } catch {
    res.status(401).json({ message: 'Not authorized, token failed' })
  }
}

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).json({ message: 'Not authorized as admin' })
  }
}

export { protect, admin }