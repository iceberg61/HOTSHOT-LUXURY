import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true, enum: ['TOPS', 'ACCESSORIES'] },
  sizes: [{ type: String }],
  tag: { type: String, enum: ['NEW', 'LIMITED', null], default: null },
  inStock: { type: Boolean, default: true },
  countInStock: { type: Number, default: 10 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)
export default Product