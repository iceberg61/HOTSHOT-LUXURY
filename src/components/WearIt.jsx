const photos = [
  { src: '/images/9.jpeg', alt: 'Customer 1' },
  { src: '/images/2.jpeg', alt: 'Customer 2' },
  { src: '/images/3.jpeg', alt: 'Customer 3' },
  { src: '/images/4.jpeg', alt: 'Customer 4' },
  { src: '/images/5.jpeg', alt: 'Customer 5' },
  { src: '/images/6.jpeg', alt: 'Customer 6' },
  { src: '/images/7.jpeg', alt: 'Customer 7' },
  { src: '/images/8.jpeg', alt: 'Customer 8' },
  { src: '/images/10.jpeg', alt: 'Customer 10' },
]

function WearIt() {
  return (
    <section className="bg-black py-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-red-500 text-xs tracking-[0.4em] uppercase mb-3">The Community</p>
          <h2 className="text-white text-4xl font-black uppercase tracking-wider mb-4">Wear It.</h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-16 h-px bg-zinc-700" />
            <div className="w-2 h-2 border border-red-500 rotate-45" />
            <div className="w-16 h-px bg-zinc-700" />
          </div>
          <p className="text-zinc-500 text-xs tracking-wider max-w-sm mx-auto">
            Real people. Real fits. Tag us on Snapchat to be featured.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="break-inside-avoid overflow-hidden rounded-lg border border-zinc-800 hover:border-red-500 transition-all duration-300 group"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-zinc-500 text-xs tracking-wider mb-4">
            Want to be featured? Tag us on Snapchat
          </p>
          <a
            href="https://snapchat.com/t/6N4EamL9"
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-lg border-red-500 text-red-500 text-xs tracking-[0.3em] uppercase px-10 py-4 hover:bg-red-500 hover:text-black transition-all duration-300 inline-block"
          >
            Follow Us →
          </a>
        </div>

      </div>
    </section>
  )
}

export default WearIt