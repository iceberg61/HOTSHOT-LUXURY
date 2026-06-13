import express from 'express'
import { submitContact, subscribeNewsletter, getAllContacts, getAllSubscribers } from '../controllers/contactController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/', submitContact)
router.post('/newsletter', subscribeNewsletter)
router.get('/', protect, admin, getAllContacts)
router.get('/newsletter', protect, admin, getAllSubscribers)

export default router