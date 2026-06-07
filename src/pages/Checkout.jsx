import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useCartStore from '../store/cartStore'

function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: '',
    paymentMethod: 'card',
    cardNumber: '', cardName: '', cardExpiry: '', cardCVV: '',
  })

  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const validate = () => {
    const newErrors = {}
    if (!form.firstName) newErrors.firstName = 'Required'
    if (!form.lastName) newErrors.lastName = 'Required'
    if (!form.email) newErrors.email = 'Required'
    if (!form.phone) newErrors.phone = 'Required'
    if (!form.address) newErrors.address = 'Required'
    if (!form.city) newErrors.city = 'Required'
    if (!form.state) newErrors.state = 'Required'
    if (!form.country) newErrors.country = 'Required'
    if (form.paymentMethod === 'card') {
      if (!form.cardNumber) newErrors.cardNumber = 'Required'
      if (!form.cardName) newErrors.cardName = 'Required'
      if (!form.cardExpiry) newErrors.cardExpiry = 'Required'
      if (!form.cardCVV) newErrors.cardCVV = 'Required'
    }
    return newErrors
  }

  const handlePlaceOrder = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setPlacing(true)
    setTimeout(() => {
      clearCart()
      navigate('/order-confirmation')
    }, 2000)
  }

  const inputClass = (field) =>
    `w-full bg-zinc-900 border text-white text-xs px-5 py-4 tracking-wider placeholder-zinc-600 focus:outline-none transition-colors ${
      errors[field] ? 'border-red-500' : 'border-zinc-800 focus:border-red-500'
    }`

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-32 pb-16 px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none">
          <p className="text-zinc-900 text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            CHECKOUT
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-6xl md:text-8xl font-black uppercase">
            Check<span className="text-red-500">out</span>
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <Link to="/cart" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Cart</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Checkout</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Left — Form */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* Shipping Info */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center font-black">1</span>
                <h2 className="text-white text-sm font-black tracking-[0.3em] uppercase">Shipping Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name *" className={inputClass('firstName')} />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name *" className={inputClass('lastName')} />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                <div>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address *" className={inputClass('email')} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" className={inputClass('phone')} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div className="md:col-span-2">
                  <input name="address" value={form.address} onChange={handleChange} placeholder="Street Address *" className={inputClass('address')} />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                <div>
                  <input name="city" value={form.city} onChange={handleChange} placeholder="City *" className={inputClass('city')} />
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                </div>
                <div>
                  <input name="state" value={form.state} onChange={handleChange} placeholder="State *" className={inputClass('state')} />
                  {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                </div>
                <div>
                  <input name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP / Postal Code" className={inputClass('zip')} />
                </div>
                <div>
                  <input name="country" value={form.country} onChange={handleChange} placeholder="Country *" className={inputClass('country')} />
                  {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center font-black">2</span>
                <h2 className="text-white text-sm font-black tracking-[0.3em] uppercase">Payment Method</h2>
              </div>

              {/* Payment Toggle */}
              <div className="flex gap-3 mb-6">
                {['card', 'transfer'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setForm({ ...form, paymentMethod: method })}
                    className={`px-6 py-3 text-xs tracking-widest uppercase border transition-all duration-300 ${
                      form.paymentMethod === method
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'border-zinc-700 text-zinc-400 hover:border-white hover:text-white'
                    }`}
                  >
                    {method === 'card' ? 'Credit / Debit Card' : 'Bank Transfer'}
                  </button>
                ))}
              </div>

              {/* Card Fields */}
              {form.paymentMethod === 'card' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <input name="cardNumber" value={form.cardNumber} onChange={handleChange} placeholder="Card Number *" maxLength={19} className={inputClass('cardNumber')} />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Name on Card *" className={inputClass('cardName')} />
                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                  </div>
                  <div>
                    <input name="cardExpiry" value={form.cardExpiry} onChange={handleChange} placeholder="MM / YY *" maxLength={5} className={inputClass('cardExpiry')} />
                    {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                  </div>
                  <div>
                    <input name="cardCVV" value={form.cardCVV} onChange={handleChange} placeholder="CVV *" maxLength={4} className={inputClass('cardCVV')} />
                    {errors.cardCVV && <p className="text-red-500 text-xs mt-1">{errors.cardCVV}</p>}
                  </div>
                </div>
              )}

              {/* Bank Transfer */}
              {form.paymentMethod === 'transfer' && (
                <div className="bg-zinc-950 border border-zinc-800 p-6">
                  <p className="text-zinc-400 text-xs tracking-wider leading-relaxed mb-4">
                    Make your payment directly to our bank account. Use your order ID as reference. Your order will be confirmed once payment is verified.
                  </p>
                  <div className="flex flex-col gap-2">
                    <p className="text-white text-xs tracking-wider"><span className="text-zinc-500">Bank:</span> First Bank Nigeria</p>
                    <p className="text-white text-xs tracking-wider"><span className="text-zinc-500">Account Name:</span> Hotshot Luxury Ltd</p>
                    <p className="text-white text-xs tracking-wider"><span className="text-zinc-500">Account Number:</span> 0123456789</p>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right — Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-950 border border-zinc-800 p-6 sticky top-28">
              <h2 className="text-white text-sm font-black tracking-[0.3em] uppercase mb-6">
                Order Summary
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.size}-${index}`} className="flex gap-3 items-center">
                    <div className="w-14 h-14 bg-zinc-900 border border-zinc-800 overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-xs font-bold tracking-wider uppercase">{item.name}</p>
                      <p className="text-zinc-500 text-xs">Size: {item.size} · Qty: {item.quantity}</p>
                    </div>
                    <p className="text-red-500 text-xs font-bold shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-3 border-t border-zinc-800 pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <p className="text-zinc-400 text-xs tracking-wider">Subtotal</p>
                  <p className="text-white text-xs font-bold">${getTotalPrice().toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-zinc-400 text-xs tracking-wider">Shipping</p>
                  <p className="text-zinc-400 text-xs">TBD</p>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                  <p className="text-white text-xs font-black tracking-widest uppercase">Total</p>
                  <p className="text-red-500 text-lg font-black">${getTotalPrice().toFixed(2)}</p>
                </div>
              </div>

              {/* Place Order */}
              <button
                onClick={handlePlaceOrder}
                disabled={placing || items.length === 0}
                className={`w-full text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 ${
                  placing
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : items.length === 0
                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {placing ? 'Placing Order...' : 'Place Order'}
              </button>

              <p className="text-zinc-600 text-xs tracking-wider text-center mt-4">
                🔒 Secure checkout — your data is protected
              </p>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Checkout