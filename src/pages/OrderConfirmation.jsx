import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function OrderConfirmation() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-8 py-32">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 bg-green-600 flex items-center justify-center mx-auto mb-8">
            <span className="text-white text-2xl">✓</span>
          </div>
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4">Order Placed</p>
          <h1 className="text-white text-4xl font-black uppercase mb-4">
            Thank You!
          </h1>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-10">
            Your order has been received and is being processed. You will receive a confirmation email shortly.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/shop"
              className="bg-red-500 text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-red-600 transition-all duration-300"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="border border-zinc-700 text-zinc-400 text-xs tracking-[0.3em] uppercase px-8 py-4 hover:border-white hover:text-white transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderConfirmation