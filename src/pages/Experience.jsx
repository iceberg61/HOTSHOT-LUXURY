import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SEO from '../components/SEO'

function Experience() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO title="The Experience" url="/experience" />
      <Navbar />

      {/* Hero */}
      <div className="relative bg-zinc-950 border-b border-zinc-900 pt-24 pb-10 px-4 sm:px-8 overflow-hidden">
        <div className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden">
          <p className="text-zinc-900 text-[5rem] sm:text-[10rem] font-black uppercase tracking-widest opacity-40 whitespace-nowrap">
            EXPERIENCE
          </p>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <h1 className="text-white text-4xl sm:text-6xl md:text-8xl font-black uppercase leading-none">
            The <span className="text-red-500">Experience</span>
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Link to="/" className="text-red-500 text-xs tracking-widest uppercase hover:text-white transition-colors">Home</Link>
            <span className="text-zinc-600 text-xs">»</span>
            <span className="text-zinc-400 text-xs tracking-widest uppercase">The Experience</span>
          </div>
        </div>
      </div>

      {/* Brand Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4">Our Story</p>
            <h2 className="text-white text-3xl sm:text-5xl font-black uppercase leading-tight mb-6">
              Built From <br /><span className="text-red-500">Pressure.</span>
            </h2>
            <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-6">
              Hotshot Luxury was born out of a simple belief — that style should be unapologetic. We don't follow trends. We set them. Every piece we drop is a statement, a declaration that the world moves on our terms.
            </p>
            <p className="text-zinc-400 text-sm tracking-wider leading-relaxed">
              Founded in Nigeria, rooted in the hustle, refined by vision. We are not just a clothing brand — we are a movement for those who refuse to blend in.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden border border-zinc-800 h-80 sm:h-96">
            <img
              src="/images/hotshot.jpeg"
              alt="Hotshot Luxury"
              className="w-full h-full object-contain object-center "
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-3">What We Stand For</p>
            <h2 className="text-white text-3xl sm:text-4xl font-black uppercase">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Unapologetic', desc: 'We make no apologies for our style. Bold, aggressive, and premium in every stitch.', icon: '🔥' },
              { title: 'Limited', desc: 'Scarcity is intentional. Every drop is limited because exclusivity is earned, not given.', icon: '⚡' },
              { title: 'Quality', desc: 'Premium materials, premium execution. We never compromise on the feel of what we create.', icon: '💎' },
              { title: 'Community', desc: 'Built by the culture, for the culture. Every piece carries the energy of those who wear it.', icon: '👑' },
              { title: 'Identity', desc: 'Wear what you are. Hotshot Luxury is not a brand you put on — it\'s who you already are.', icon: '🎯' },
              { title: 'Legacy', desc: 'We build for the long run. Every drop adds to a story that will outlast any trend.', icon: '🏆' },
            ].map((value) => (
              <div key={value.title} className="bg-zinc-950 border border-zinc-800 hover:border-red-500 transition-colors duration-300 p-6 rounded-lg">
                <span className="text-3xl mb-4 block">{value.icon}</span>
                <h3 className="text-white text-sm font-black uppercase tracking-wider mb-3">{value.title}</h3>
                <p className="text-zinc-500 text-xs tracking-wider leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4">Ready?</p>
          <h2 className="text-white text-3xl sm:text-4xl font-black uppercase mb-6">Join The Movement</h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/shop" className="bg-red-500 text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-red-600 transition-all duration-300 rounded-lg">
              Shop The Drop
            </Link>
            <Link to="/contact" className="border border-zinc-700 text-zinc-400 text-xs tracking-[0.3em] uppercase px-8 py-4 hover:border-white hover:text-white transition-all duration-300 rounded-lg">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Experience