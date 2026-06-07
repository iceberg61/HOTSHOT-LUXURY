function Hero() {
  return (
    <section className="relative min-h-screen bg-black flex items-center overflow-hidden">

      {/* Background glow effect */}
      <div className="absolute right-0 top-0 w-2/3 h-full bg-linear-to-l from-red-950/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 w-full flex items-center justify-between">

        {/* Left — Text */}
        <div className="max-w-xl">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-6">
            Limited Drop — 2026
          </p>
          <h1 className="text-7xl font-black text-white leading-none uppercase mb-6">
            Unapologetically <br />
            <span className="text-red-500">Elite.</span>
          </h1>
          <p className="text-zinc-400 text-sm tracking-wider leading-relaxed mb-10">
            Where high-octane attitude meets timeless luxury. <br />
            Explore the limited drop.
          </p>
          <button className="border border-red-500 text-red-500 px-10 py-4 text-xs tracking-[0.3em] uppercase hover:bg-red-500 hover:text-black transition-all duration-300">
            [ ENTER THE EXPERIENCE ]
          </button>
        </div>

        {/* Right — Image placeholder */}
        <div className="hidden lg:flex items-center justify-center w-1/2 h-screen">
          <div className="w-80 h-125 border border-zinc-800 flex items-center justify-center">
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