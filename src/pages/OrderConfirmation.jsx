import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function OrderConfirmation() {
  const { id } = useParams()

  return (
    <div className="bg-black min-h-screen flex flex-col py-20">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 py-20 sm:py-32">
          <div className="text-center max-w-lg w-full">
            <div className="w-16 h-16 bg-green-600 flex items-center justify-center mx-auto mb-8">
              <span className="text-white text-2xl">✓</span>
            </div>
            <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4">Order Placed</p>
            <h1 className="text-white text-3xl sm:text-4xl font-black uppercase mb-4">
              Thank You!
            </h1>
            <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-4 px-4">
              Your order has been received and is being processed.
            </p>
            {id && (
              <div className="bg-zinc-950 border rounded-lg border-zinc-800 px-4 py-3 mb-8 mx-4">
                <p className="text-zinc-500 text-xs tracking-wider mb-1">Order ID</p>
                <p className="text-white text-xs font-bold tracking-wider break-all">{id}</p>
              </div>
            )}
            <div className="flex items-center justify-center gap-4 flex-wrap px-4">
              <Link to="/shop" className="bg-red-500 text-white text-xs tracking-[0.3em] uppercase px-6 sm:px-8 py-4 hover:bg-red-600 transition-all duration-300 rounded-lg">
                Continue Shopping
              </Link>
              <Link to="/" className="border rounded-lg border-zinc-700 text-zinc-400 text-xs tracking-[0.3em] uppercase px-6 sm:px-8 py-4 hover:border-white hover:text-white transition-all duration-300">
                Back to Home
              </Link>
              <Link
                to="/track-order"
                className="border rounded-lg border-zinc-700 text-zinc-400 text-xs tracking-[0.3em] uppercase px-6 sm:px-8 py-4 hover:border-white hover:text-white transition-all duration-300"
              >
                Track Order
              </Link>
            </div>
          </div>
        </div>
      <Footer />
    </div>
  )
}

export default OrderConfirmation