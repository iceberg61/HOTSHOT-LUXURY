import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

const tops = [
  { size: 'XS', chest: '32-34', waist: '26-28', hip: '34-36' },
  { size: 'S', chest: '34-36', waist: '28-30', hip: '36-38' },
  { size: 'M', chest: '38-40', waist: '32-34', hip: '40-42' },
  { size: 'L', chest: '42-44', waist: '36-38', hip: '44-46' },
  { size: 'XL', chest: '46-48', waist: '40-42', hip: '48-50' },
  { size: 'XXL', chest: '50-52', waist: '44-46', hip: '52-54' },
]

function SizeGuide() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO title="Size Guide" url="/size-guide" />
      <Navbar />

      {/* Hero */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[4rem] sm:text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            SIZE GUIDE
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl font-black uppercase leading-none">
            Size <span className="text-red-500">Guide</span>
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">Size Guide</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">

        {/* How to Measure */}
        <div className="mb-16">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4">How To Measure</p>
          <h2 className="text-white text-2xl font-black uppercase tracking-wider mb-8">Getting Your Size Right</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { label: 'Chest', desc: 'Measure around the fullest part of your chest, keeping the tape horizontal.' },
              { label: 'Waist', desc: 'Measure around your natural waistline, keeping the tape comfortably loose.' },
              { label: 'Hip', desc: 'Measure around the fullest part of your hips, about 8 inches below your waist.' },
            ].map((item) => (
              <div key={item.label} className="bg-zinc-950 border rounded-lg border-zinc-800 p-6">
                <p className="text-red-500 text-xs tracking-widest uppercase font-bold mb-3">{item.label}</p>
                <p className="text-zinc-400 text-xs tracking-wider leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Size Table — Tops */}
        <div className="mb-16">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4">Clothing</p>
          <h2 className="text-white text-2xl font-black uppercase tracking-wider mb-6">Tops & Hoodies</h2>
          <p className="text-zinc-500 text-xs tracking-wider mb-6">All measurements in inches.</p>
          <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full bg-zinc-950 border  border-zinc-800">
              <thead>
                <tr className="border-b border-zinc-800">
                  {['Size', 'Chest', 'Waist', 'Hip'].map((h) => (
                    <th key={h} className="px-4 sm:px-6 py-4 text-left text-zinc-500 text-xs tracking-widest uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tops.map((row, i) => (
                  <tr key={row.size} className={`border-b border-zinc-900 hover:bg-zinc-900 transition-colors ${i === 2 ? 'bg-red-500/5' : ''}`}>
                    <td className="px-4 sm:px-6 py-4 text-white text-xs font-black">{row.size}{i === 2 ? ' ★' : ''}</td>
                    <td className="px-4 sm:px-6 py-4 text-zinc-400 text-xs">{row.chest}"</td>
                    <td className="px-4 sm:px-6 py-4 text-zinc-400 text-xs">{row.waist}"</td>
                    <td className="px-4 sm:px-6 py-4 text-zinc-400 text-xs">{row.hip}"</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-zinc-600 text-xs tracking-wider mt-3">★ Most popular size</p>
        </div>

        {/* Accessories */}
        <div className="mb-16">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4">Accessories</p>
          <h2 className="text-white text-2xl font-black uppercase tracking-wider mb-6">Caps & Headwear</h2>
          <div className="bg-zinc-950 border rounded-lg border-zinc-800 p-6">
            <p className="text-zinc-400 text-xs tracking-wider leading-relaxed mb-4">
              All Hotshot Luxury caps are <span className="text-white font-bold">ONE SIZE</span> with an adjustable snapback fit. They comfortably fit head circumferences from <span className="text-white font-bold">54cm to 62cm</span>.
            </p>
            <p className="text-zinc-500 text-xs tracking-wider">
              To measure your head size, wrap a tape measure around your head about 1cm above your ears.
            </p>
          </div>
        </div>

        {/* Fit Guide */}
        <div className="mb-16">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4">Fit Guide</p>
          <h2 className="text-white text-2xl font-black uppercase tracking-wider mb-6">How Our Pieces Fit</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { fit: 'Hoodies', desc: 'Our hoodies are cut with an oversized relaxed fit. If you prefer a slimmer look, size down by one.' },
              { fit: 'T-Shirts', desc: 'Our tees run true to size with a slightly relaxed fit. Size up for an oversized look.' },
              { fit: 'Sleeveless', desc: 'Cut slim and athletic. If between sizes, size up for comfort.' },
              { fit: 'Long Sleeves', desc: 'True to size with room through the body. Perfect layering piece.' },
            ].map((item) => (
              <div key={item.fit} className="bg-zinc-950 border rounded-lg border-zinc-800 p-5 flex gap-4">
                <div className="w-1 bg-red-500 shrink-0" />
                <div>
                  <p className="text-white text-xs font-black uppercase tracking-wider mb-2">{item.fit}</p>
                  <p className="text-zinc-500 text-xs tracking-wider leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Still unsure */}
        <div className="bg-zinc-950 border rounded-lg border-zinc-800 p-8 text-center">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-3">Need Help?</p>
          <h3 className="text-white text-xl font-black uppercase tracking-wider mb-4">Still Unsure About Your Size?</h3>
          <p className="text-zinc-500 text-xs tracking-wider mb-6">Contact us and we'll help you find the perfect fit.</p>
          <Link to="/contact" className="bg-red-500 rounded-lg text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-red-600 transition-all duration-300">
            Contact Us
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default SizeGuide