import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
})

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [orderItemSchema],
  shippingAddress: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String },
    country: { type: String, required: true },
  },
  paymentMethod: { type: String, required: true, enum: ['card', 'transfer'] },
  paymentStatus: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed'] },
  flutterwaveRef: { type: String },
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    default: 'processing',
    enum: ['processing', 'confirmed', 'shipped', 'delivered', 'cancelled']
  },
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)
export default Order