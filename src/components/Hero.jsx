import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">

      {/* Background glow */}
      <div className="absolute right-0 top-0 w-2/3 h-full bg-linear-to-l from-red-950/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 w-full flex items-center justify-between pt-24 pb-12">

        {/* Left — Text */}
        <div className="w-full lg:max-w-xl">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6">
            Limited Drop — 2026
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none uppercase mb-4 sm:mb-6">
            Unapologetically <br />
            <span className="text-red-500">Elite.</span>
          </h1>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-8 sm:mb-10 max-w-md">
            Where high-octane attitude meets timeless luxury.
            Explore the limited drop.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              to="/shop"
              className="border border-red-500 text-red-500 px-8 sm:px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-red-500 hover:text-black transition-all duration-300"
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
        </div>

        {/* Right — Image */}
        <div className="hidden lg:flex items-center justify-center w-1/2 h-screen">
          <div className="w-80 h-125 border border-zinc-800 flex items-center justify-center hover:border-red-500 transition-colors duration-300">
            <p className="text-zinc-600 text-xs tracking-widest uppercase">
              Model Image Here
            </p>
          </div>
        </div>

      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent" />

    </section>
  )
}

export default Hero