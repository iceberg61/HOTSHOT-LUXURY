import Review from '../models/Review.js'
import Product from '../models/Product.js'

// @desc    Get reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .sort({ createdAt: -1 })
  res.json(reviews)
}

// @desc    Create a review
// @route   POST /api/reviews/:productId
// @access  Public (guest allowed)
const createReview = async (req, res) => {
  const { rating, comment, name } = req.body

  if (!rating || !comment || !name) {
    res.status(400).json({ message: 'Name, rating and comment are required' })
    return
  }

  // Check if user already reviewed
  if (req.user) {
    const existing = await Review.findOne({
      product: req.params.productId,
      user: req.user._id,
    })
    if (existing) {
      res.status(400).json({ message: 'You have already reviewed this product' })
      return
    }
  }

  const review = await Review.create({
    product: req.params.productId,
    user: req.user ? req.user._id : null,
    name,
    rating: Number(rating),
    comment,
  })

  // Update product rating
  const reviews = await Review.find({ product: req.params.productId })
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length

  await Product.findByIdAndUpdate(req.params.productId, {
    rating: avgRating,
    numReviews: reviews.length,
  })

  res.status(201).json(review)
}

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = async (req, res) => {
  const review = await Review.findById(req.params.id)
  if (!review) {
    res.status(404).json({ message: 'Review not found' })
    return
  }
  await review.deleteOne()
  res.json({ message: 'Review removed' })
}

export { getProductReviews, createReview, deleteReview }