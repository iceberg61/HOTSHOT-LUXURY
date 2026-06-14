import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useCartStore from '../store/cartStore'
import useAuthStore from '../store/authStore'
import { createOrder, verifyPayment } from '../api/orderApi'

function Checkout() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { user } = useAuthStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '',
    address: '', city: '', state: '', zip: '', country: '',
    paymentMethod: 'card',
  })

  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
    setServerError('')
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
    return newErrors
  }

  const handleFlutterwavePayment = (order) => {
    if (!window.FlutterwaveCheckout) {
      setServerError('Payment system not loaded. Please refresh the page and try again.')
      setPlacing(false)
      return
    }

    const txRef = `HSL-${Date.now()}`

    // Save txRef to order immediately
    fetch(`${import.meta.env.VITE_API_URL}/api/orders/${order._id}/save-ref`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}),
      },
      body: JSON.stringify({ txRef }),
    })

    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
      tx_ref: txRef,
      amount: getTotalPrice(),
      currency: 'NGN',
      payment_options: 'card,banktransfer,ussd,account',
      customer: {
        email: form.email,
        phone_number: form.phone,
        name: `${form.firstName} ${form.lastName}`,
      },
      customizations: {
        title: 'Hotshot Luxury',
        description: 'Payment for your order',
      },
      callback: async (response) => {
        console.log('Flutterwave response:', response)
        if (
          response.status === 'successful' ||
          response.status === 'completed'
        ) {
          try {
            setPlacing(true)
            await verifyPayment(order._id, response.transaction_id, user?.token)
            clearCart()
            navigate(`/order-confirmation/${order._id}`)
          } catch {
            clearCart()
            navigate(`/order-confirmation/${order._id}`)
          }
        } else if (response.status === 'pending') {
          clearCart()
          navigate(`/order-confirmation/${order._id}`)
        } else {
          setServerError('Payment not completed. Your order ID: ' + order._id)
          setPlacing(false)
        }
      },
      onclose: async () => {
        try {
          const orderCheck = await fetch(
            `${import.meta.env.VITE_API_URL}/api/orders/${order._id}`,
            {
              headers: user?.token
                ? { Authorization: `Bearer ${user.token}` }
                : {},
            }
          )
          const orderData = await orderCheck.json()
          if (orderData.paymentStatus === 'paid' || orderData.status === 'confirmed') {
            clearCart()
            navigate(`/order-confirmation/${order._id}`)
          } else {
            setServerError('Payment window closed. Your order ID is: ' + order._id)
            setPlacing(false)
          }
        } catch {
          setServerError('Payment window closed. Your order ID is: ' + order._id)
          setPlacing(false)
        }
      },
    })
  }

  const handlePlaceOrder = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (items.length === 0) {
      setServerError('Your cart is empty')
      return
    }

    setPlacing(true)
    setServerError('')

    try {
      const orderData = {
        items: items.map((item) => ({
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size,
          quantity: item.quantity,
          product: item._id,
        })),
        shippingAddress: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
        paymentMethod: form.paymentMethod,
        totalPrice: getTotalPrice(),
      }

      const order = await createOrder(orderData, user?.token)

      setPlacing(false)
      handleFlutterwavePayment(order)

    } catch {
      setServerError('Unable to place order. Please try again.')
      setPlacing(false)
    }
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

        {serverError && (
          <div className="bg-red-500/10 border border-red-500 px-4 py-3 mb-8">
            <p className="text-red-500 text-xs tracking-wider">{serverError}</p>
          </div>
        )}

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

              <div className="flex gap-3 mb-6 flex-wrap">
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
                    {method === 'card' ? '💳 Pay with Flutterwave' : '🏦 Bank Transfer'}
                  </button>
                ))}
              </div>

              {form.paymentMethod === 'card' && (
                <div className="bg-zinc-950 border border-zinc-800 p-6">
                  <p className="text-zinc-400 text-xs tracking-wider leading-relaxed">
                    You will be redirected to Flutterwave's secure payment page to complete your payment. We accept cards, USSD, and bank transfers.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-green-500 text-xs tracking-wider">Secured by Flutterwave</p>
                  </div>
                </div>
              )}

              {form.paymentMethod === 'transfer' && (
                <div className="bg-zinc-950 border border-zinc-800 p-6">
                  <p className="text-zinc-400 text-xs tracking-wider leading-relaxed">
                    You will be redirected to Flutterwave's secure payment page where you can complete your payment via bank transfer, USSD, or card.
                  </p>
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-green-500 text-xs tracking-wider">Secured by Flutterwave</p>
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

              <div className="flex flex-col gap-4 mb-6 max-h-64 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={`${item._id}-${item.size}-${index}`} className="flex gap-3 items-center">
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
                      ₦{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 border-t border-zinc-800 pt-4 mb-6">
                <div className="flex items-center justify-between">
                  <p className="text-zinc-400 text-xs tracking-wider">Subtotal</p>
                  <p className="text-white text-xs font-bold">₦{getTotalPrice().toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-zinc-400 text-xs tracking-wider">Shipping</p>
                  <p className="text-zinc-400 text-xs">TBD</p>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-800 pt-3">
                  <p className="text-white text-xs font-black tracking-widest uppercase">Total</p>
                  <p className="text-red-500 text-lg font-black">₦{getTotalPrice().toFixed(2)}</p>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placing || items.length === 0}
                className={`w-full text-xs tracking-[0.3em] uppercase py-4 transition-all duration-300 ${
                  placing
                    ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
                    : items.length === 0
                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {placing ? 'Processing...' : form.paymentMethod === 'card' ? 'Pay Now' : 'Place Order'}
              </button>

              <p className="text-zinc-600 text-xs tracking-wider text-center mt-4">
                🔒 Secured by Flutterwave
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