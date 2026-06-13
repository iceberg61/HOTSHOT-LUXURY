import Contact from '../models/Contact.js'
import Newsletter from '../models/Newsletter.js'
import { sendContactEmail, sendNewsletterWelcomeEmail } from '../utils/emailService.js'

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContact = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body

  if (!firstName || !lastName || !email || !message) {
    res.status(400).json({ message: 'Please fill all required fields' })
    return
  }

  await Contact.create({ firstName, lastName, email, phone, message })

  try {
    await sendContactEmail({ firstName, lastName, email, phone, message })
  } catch (err) {
    console.error('Contact email error:', err)
  }

  res.status(201).json({ message: 'Message received! We will get back to you shortly.' })
}

// @desc    Subscribe to newsletter
// @route   POST /api/contact/newsletter
// @access  Public
const subscribeNewsletter = async (req, res) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({ message: 'Email is required' })
    return
  }

  const existing = await Newsletter.findOne({ email })
  if (existing) {
    res.status(400).json({ message: 'You are already subscribed!' })
    return
  }

  await Newsletter.create({ email })

  try {
    await sendNewsletterWelcomeEmail(email)
  } catch (err) {
    console.error('Newsletter email error:', err)
  }

  res.status(201).json({ message: 'Successfully subscribed to the VIP list!' })
}

// @desc    Get all contacts
// @route   GET /api/contact
// @access  Private/Admin
const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({}).sort({ createdAt: -1 })
  res.json(contacts)
}

// @desc    Get all newsletter subscribers
// @route   GET /api/contact/newsletter
// @access  Private/Admin
const getAllSubscribers = async (req, res) => {
  const subscribers = await Newsletter.find({}).sort({ createdAt: -1 })
  res.json(subscribers)
}

export { submitContact, subscribeNewsletter, getAllContacts, getAllSubscribers }