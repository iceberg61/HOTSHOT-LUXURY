import Wishlist from '../models/Wishlist.js'

// @desc    Get wishlist
// @route   GET /api/wishlist
// @access  Private
const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id })
    .populate('products')
  res.json(wishlist?.products || [])
}

// @desc    Add to wishlist
// @route   POST /api/wishlist/:productId
// @access  Private
const addToWishlist = async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id })

  if (!wishlist) {
    await Wishlist.create({
      user: req.user._id,
      products: [req.params.productId],
    })
  } else {
    if (wishlist.products.includes(req.params.productId)) {
      res.status(400).json({ message: 'Already in wishlist' })
      return
    }
    wishlist.products.push(req.params.productId)
    await wishlist.save()
  }

  res.json({ message: 'Added to wishlist' })
}

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id })
  if (!wishlist) {
    res.status(404).json({ message: 'Wishlist not found' })
    return
  }
  wishlist.products = wishlist.products.filter(
    (p) => p.toString() !== req.params.productId
  )
  await wishlist.save()
  res.json({ message: 'Removed from wishlist' })
}

export { getWishlist, addToWishlist, removeFromWishlist }