import { Link } from 'react-router-dom'
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import useCartStore from '../store/cartStore'

function Cart() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore()

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 sm:pt-32 pb-10 sm:pb-16 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[5rem] sm:text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            CART
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-black uppercase">
            Your <span className="text-red-500">Cart</span>
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Cart</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 sm:py-16">

        {items.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <ShoppingBag size={64} className="text-zinc-700" />
            <p className="text-zinc-600 text-xs tracking-widest uppercase">Your cart is empty</p>
            <Link
              to="/shop"
              className="border border-red-500 text-red-500 text-xs tracking-widest uppercase px-8 py-3 hover:bg-red-500 hover:text-black transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Left — Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              {/* Table Header */}
              <div className="hidden md:grid grid-cols-5 gap-4 pb-4 border-b border-zinc-800">
                <p className="text-zinc-600 text-xs tracking-widest uppercase col-span-2">Product</p>
                <p className="text-zinc-600 text-xs tracking-widest uppercase text-center">Price</p>
                <p className="text-zinc-600 text-xs tracking-widest uppercase text-center">Quantity</p>
                <p className="text-zinc-600 text-xs tracking-widest uppercase text-right">Total</p>
              </div>

              {/* Items */}
              {items.map((item, index) => (
                <div
                  key={`${item._id}-${item.size}-${index}`}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center py-6 border-b border-zinc-800"
                >
                  {/* Product — image + info */}
                  <div className="flex items-center gap-4 md:col-span-2">
                    <Link to={`/product/${item._id}`} className="shrink-0">
                      <div className="w-20 h-20 bg-zinc-900 border border-zinc-800 overflow-hidden hover:border-red-500 transition-colors">
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                        />
                      </div>
                    </Link>
                    <div>
                      <p className="text-white text-xs font-bold tracking-wider uppercase mb-1">
                        {item.name}
                      </p>
                      <p className="text-zinc-500 text-xs tracking-wider">
                        Size: {item.size}
                      </p>
                      <button
                        onClick={() => removeFromCart(item._id, item.size)}
                        className="flex items-center gap-1 text-zinc-600 text-xs tracking-wider hover:text-red-500 transition-colors mt-2"
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <p className="text-zinc-400 text-xs tracking-wider md:text-center">
                    <span className="md:hidden text-zinc-600 mr-2">Price:</span>
                    ${item.price}.00
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center md:justify-center">
                    <div className="flex items-center border border-zinc-700">
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                        className="px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all text-sm"
                      >
                        −
                      </button>
                      <span className="px-4 py-2 text-white text-xs border-x border-zinc-700 min-w-10 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-all text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <p className="text-red-500 text-xs font-bold tracking-wider md:text-right">
                    <span className="md:hidden text-zinc-600 mr-2">Total:</span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                </div>
              ))}

              {/* Cart Actions */}
              <div className="flex items-center justify-between pt-4 flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="flex items-center gap-2 text-zinc-400 text-xs tracking-widest uppercase hover:text-red-500 transition-colors duration-300"
                >
                  <ArrowLeft size={14} />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-zinc-600 text-xs tracking-widest uppercase hover:text-red-500 transition-colors duration-300"
                >
                  Clear Cart
                </button>
              </div>

            </div>

            {/* Right — Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-950 border border-zinc-800 p-6 sticky top-28">
                <h2 className="text-white text-sm font-black tracking-[0.3em] uppercase mb-6">
                  Order Summary
                </h2>

                <div className="flex flex-col gap-3 mb-6">
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-xs tracking-wider">
                      Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)
                    </p>
                    <p className="text-white text-xs font-bold">
                      ${getTotalPrice().toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-xs tracking-wider">Shipping</p>
                    <p className="text-zinc-400 text-xs">Calculated at checkout</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-zinc-400 text-xs tracking-wider">Tax</p>
                    <p className="text-zinc-400 text-xs">Calculated at checkout</p>
                  </div>
                </div>

                <div className="border-t border-zinc-800 pt-4 mb-6">
                  <div className="flex items-center justify-between">
                    <p className="text-white text-xs font-black tracking-widest uppercase">Total</p>
                    <p className="text-red-500 text-lg font-black">
                      ${getTotalPrice().toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="flex mb-6">
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 bg-zinc-900 border border-zinc-700 text-white text-xs px-4 py-3 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
                  />
                  <button className="bg-zinc-800 border border-zinc-700 border-l-0 text-zinc-400 text-xs px-4 tracking-widest uppercase hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300">
                    Apply
                  </button>
                </div>

                <Link
                  to="/checkout"
                  className="w-full block bg-red-500 text-white text-xs tracking-[0.3em] uppercase py-4 text-center hover:bg-red-600 transition-all duration-300"
                >
                  Proceed to Checkout
                </Link>

              </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Cart