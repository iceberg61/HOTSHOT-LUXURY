import { X, Trash2, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function CartDrawer({ isOpen, onClose }) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } = useCartStore()

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
          <div>
            <h2 className="text-white text-sm font-black tracking-[0.3em] uppercase">
              Your Cart
            </h2>
            <p className="text-zinc-500 text-xs tracking-wider mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="border border-zinc-700 p-2 text-zinc-400 hover:border-red-500 hover:text-red-500 transition-all duration-300"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <ShoppingBag size={48} className="text-zinc-700" />
              <p className="text-zinc-600 text-xs tracking-widest uppercase">Your cart is empty</p>
              <button
                onClick={onClose}
                className="border border-red-500 text-red-500 text-xs tracking-widest uppercase px-6 py-3 hover:bg-red-500 hover:text-black transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item, index) => (
                <div key={`${item.id}-${item.size}-${index}`} className="flex gap-4 border-b border-zinc-800 pb-4">

                  {/* Image */}
                  <div className="w-20 h-20 bg-zinc-900 overflow-hidden shrink-0 border border-zinc-800">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-white text-xs font-bold tracking-wider uppercase">
                          {item.name}
                        </p>
                        <p className="text-zinc-500 text-xs tracking-wider mt-1">
                          Size: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-zinc-600 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Quantity + Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-zinc-700">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="px-3 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-white text-xs border-x border-zinc-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-3 py-1 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all text-sm"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-red-500 text-xs font-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer — only show when items exist */}
        {items.length > 0 && (
          <div className="border-t border-zinc-800 px-6 py-6 flex flex-col gap-4">

            {/* Subtotal */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="text-zinc-400 text-xs tracking-wider">Subtotal</p>
                <p className="text-white text-xs font-bold">${getTotalPrice().toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-zinc-400 text-xs tracking-wider">Shipping</p>
                <p className="text-zinc-400 text-xs">Calculated at checkout</p>
              </div>
              <div className="border-t border-zinc-800 pt-2 flex items-center justify-between">
                <p className="text-white text-xs font-bold tracking-widest uppercase">Total</p>
                <p className="text-red-500 text-sm font-black">${getTotalPrice().toFixed(2)}</p>
              </div>
            </div>

            {/* Buttons */}
            <Link
              to="/cart"
              onClick={onClose}
              className="w-full border border-zinc-700 text-white text-xs tracking-[0.3em] uppercase py-3 text-center hover:border-white transition-all duration-300"
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full bg-red-500 text-white text-xs tracking-[0.3em] uppercase py-3 text-center hover:bg-red-600 transition-all duration-300"
            >
              Checkout
            </Link>
          </div>
        )}

      </div>
    </>
  )
}

export default CartDrawer