import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

function Returns() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO title="Returns & Refunds" url="/returns" />
      <Navbar />

      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[4rem] sm:text-[8rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            RETURNS
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl font-black uppercase">
            Returns & <span className="text-red-500">Refunds</span>
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Returns & Refunds</span>
          </div>
          <p className="text-zinc-500 text-xs tracking-wider mt-4">Last updated: June 2026</p>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-8 py-16">

        {/* Policy Overview */}
        <div className="bg-zinc-950 border border-red-500/30 p-6 mb-12">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-2">Our Policy</p>
          <p className="text-white text-lg font-black uppercase tracking-wider mb-3">
            7-Day Return Window
          </p>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">
            We accept returns within 7 days of delivery for items that are unworn, unwashed, and in their original condition with all tags attached.
          </p>
        </div>

        <div className="flex flex-col gap-10">

          <div className="border-b border-zinc-900 pb-10">
            <h2 className="text-white text-sm font-black uppercase tracking-wider mb-4">Eligible Items</h2>
            <ul className="flex flex-col gap-2">
              {[
                'Items must be returned within 7 days of delivery',
                'Items must be unworn and unwashed',
                'All original tags must be attached',
                'Items must be in original packaging',
                'Items must be free from odours, stains, or damage',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-400 text-xs tracking-wider">
                  <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-zinc-900 pb-10">
            <h2 className="text-white text-sm font-black uppercase tracking-wider mb-4">Non-Returnable Items</h2>
            <ul className="flex flex-col gap-2">
              {[
                'Limited edition or exclusive drop items — all sales final',
                'Items marked as final sale',
                'Items that have been worn, washed, or altered',
                'Items without original tags',
                'Accessories (caps, headwear) for hygiene reasons',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-zinc-400 text-xs tracking-wider">
                  <span className="text-red-500 shrink-0 mt-0.5">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-zinc-900 pb-10">
            <h2 className="text-white text-sm font-black uppercase tracking-wider mb-4">How To Return</h2>
            <div className="flex flex-col gap-4">
              {[
                { step: '01', title: 'Contact Us', desc: 'Email us at hotshotluxury@info.com with your order ID and reason for return within 7 days of delivery.' },
                { step: '02', title: 'Get Approval', desc: 'We will review your request and send you a return authorization within 24-48 hours.' },
                { step: '03', title: 'Ship It Back', desc: 'Package your item securely and ship it to the address provided. Return shipping costs are the customer\'s responsibility.' },
                { step: '04', title: 'Get Refunded', desc: 'Once we receive and inspect your return, we will process your refund within 5-7 business days.' },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <span className="text-red-500 text-2xl font-black shrink-0">{item.step}</span>
                  <div>
                    <p className="text-white text-xs font-black uppercase tracking-wider mb-1">{item.title}</p>
                    <p className="text-zinc-500 text-xs tracking-wider leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-b border-zinc-900 pb-10">
            <h2 className="text-white text-sm font-black uppercase tracking-wider mb-4">Refunds</h2>
            <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-4">
              Approved refunds will be processed to your original payment method. Please allow 5-7 business days for the refund to appear in your account after we have processed it.
            </p>
            <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">
              Original shipping charges are non-refundable unless the return is due to our error (wrong item, damaged item, etc.).
            </p>
          </div>

          <div className="border-b border-zinc-900 pb-10">
            <h2 className="text-white text-sm font-black uppercase tracking-wider mb-4">Exchanges</h2>
            <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">
              We do not offer direct exchanges. If you need a different size or colour, please return the original item for a refund and place a new order. This ensures you get the item you want before it sells out.
            </p>
          </div>

          <div>
            <h2 className="text-white text-sm font-black uppercase tracking-wider mb-4">Damaged or Wrong Items</h2>
            <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-4">
              If you received a damaged or incorrect item, please contact us within 48 hours of delivery with photos. We will arrange a free return and send a replacement or full refund at no cost to you.
            </p>
            <Link to="/contact" className="inline-block bg-red-500 text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-red-600 transition-all duration-300">
              Contact Us
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Returns