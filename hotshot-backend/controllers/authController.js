import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import process from 'process'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '../utils/emailService.js'

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  })
}

const setCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  })
}

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400).json({ message: 'User already exists' })
    return
  }

  const user = await User.create({ firstName, lastName, email, password })

  if (user) {
    const token = generateToken(user._id)
    setCookie(res, token)
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    })
  } else {
    res.status(400).json({ message: 'Invalid user data' })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id)
    setCookie(res, token)
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    })
  } else {
    res.status(401).json({ message: 'Invalid email or password' })
  }
}

const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  })
  res.json({ message: 'Logged out successfully' })
}

const getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email
    if (req.body.password) user.password = req.body.password

    const updatedUser = await user.save()
    const token = generateToken(updatedUser._id)
    setCookie(res, token)
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token,
    })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 })
  res.json(users)
}


const forgotPassword = async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({ message: 'Email is required' })
    return
  }

  const user = await User.findOne({ email })
  if (!user) {
    // Don't reveal if email exists
    res.json({ message: 'If that email exists, a reset code has been sent' })
    return
  }

  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const otpExpiry = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes

  user.resetOTP = crypto.createHash('sha256').update(otp).digest('hex')
  user.resetOTPExpiry = otpExpiry
  await user.save()

  try {
    await sendPasswordResetEmail(email, otp)
    res.json({ message: 'If that email exists, a reset code has been sent' })
  } catch {
    user.resetOTP = undefined
    user.resetOTPExpiry = undefined
    await user.save()
    res.status(500).json({ message: 'Email could not be sent' })
  }
}

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body

  if (!email || !otp) {
    res.status(400).json({ message: 'Email and OTP are required' })
    return
  }

  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex')

  const user = await User.findOne({
    email,
    resetOTP: hashedOTP,
    resetOTPExpiry: { $gt: Date.now() },
  })

  if (!user) {
    res.status(400).json({ message: 'Invalid or expired code' })
    return
  }

  res.json({ message: 'OTP verified', verified: true })
}

const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body

  if (!email || !otp || !password) {
    res.status(400).json({ message: 'All fields are required' })
    return
  }

  const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex')

  const user = await User.findOne({
    email,
    resetOTP: hashedOTP,
    resetOTPExpiry: { $gt: Date.now() },
  })

  if (!user) {
    res.status(400).json({ message: 'Invalid or expired code' })
    return
  }

  user.password = password
  user.resetOTP = undefined
  user.resetOTPExpiry = undefined
  await user.save()

  res.json({ message: 'Password reset successful' })
}

export { register, login, logout, getProfile, updateProfile, getAllUsers, forgotPassword, verifyOTP, resetPassword }