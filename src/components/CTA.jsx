function CTA() {
  return (
    <section className="bg-red-500 py-16 sm:py-24 px-4 sm:px-8 relative overflow-hidden">

      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p className="text-red-400 text-[5rem] sm:text-[12rem] font-black uppercase tracking-widest opacity-20 whitespace-nowrap">
          HOTSHOT
        </p>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        {/* Left */}
        <div>
          <p className="text-red-200 text-xs tracking-[0.4em] uppercase mb-3">
            Don't Sleep On It
          </p>
          <h2 className="text-black text-4xl sm:text-5xl md:text-7xl font-black uppercase leading-none">
            The Drop <br /> Won't Wait.
          </h2>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-4 w-full md:w-auto">
          <p className="text-red-900 text-sm tracking-wider max-w-xs">
            Limited pieces. No restocks. Once it's gone — it's gone.
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <button className="bg-black text-white text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-zinc-900 transition-all duration-300">
              [ SHOP NOW ]
            </button>
            <button className="border border-black text-black text-xs tracking-[0.3em] uppercase px-8 py-4 hover:bg-black hover:text-white transition-all duration-300">
              [ VIEW DROP ]
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default CTA