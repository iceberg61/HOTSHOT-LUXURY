import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="background"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute right-0 top-0 w-2/3 h-full bg-linear-to-l from-red-950/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full pt-24 pb-16">

        {/* Badge */}
        <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6">
          Limited Drop — 2026
        </p>

        {/* Headline */}
        <h1 className="text-[28px] sm:text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none uppercase mb-4 sm:mb-6 max-w-2xl">
          Unapologetically <br />
          <span className="text-red-500">Elite.</span>
        </h1>

        {/* Subtext */}
        <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-8 sm:mb-10 max-w-sm sm:max-w-md">
          Where high-octane attitude meets timeless luxury.
          Explore the limited drop.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-wrap">
          <Link
            to="/experience"
            className="border border-red-500 text-red-500 px-6 sm:px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-red-500 hover:text-black transition-all duration-300 w-full sm:w-auto text-center"
          >
            [ ENTER THE EXPERIENCE ]
          </Link>
          <Link
            to="/shop"
            className="text-zinc-400 text-xs tracking-[0.3em] uppercase hover:text-white transition-colors duration-300"
          >
            View Collection →
          </Link>
        </div>

        {/* Stats row — adds visual weight on larger screens */}
        <div className="hidden sm:flex items-center gap-8 mt-12 sm:mt-16">
          <div>
            <p className="text-white text-2xl font-black">11+</p>
            <p className="text-zinc-600 text-xs tracking-widest uppercase mt-1">Products</p>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <div>
            <p className="text-white text-2xl font-black">100%</p>
            <p className="text-zinc-600 text-xs tracking-widest uppercase mt-1">Premium</p>
          </div>
          <div className="w-px h-8 bg-zinc-800" />
          <div>
            <p className="text-white text-2xl font-black">2026</p>
            <p className="text-zinc-600 text-xs tracking-widest uppercase mt-1">Limited Drop</p>
          </div>
        </div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent z-10" />

    </section>
  )
}

export default Hero