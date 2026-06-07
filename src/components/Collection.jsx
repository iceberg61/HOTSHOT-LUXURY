function Collection() {
  const products = [
    {
      id: 1,
      name: 'Long Sleeve',
      price: '$399.00',
      tag: 'LIMITED DROP',
      image: '/images/long-sleeve.jpeg',
    },
    {
      id: 2,
      name: 'Long Sleeve G',
      price: '$229.00',
      tag: 'LIMITED DROP',
      image: '/images/long-sleeve-g.jpeg',
    },
    {
      id: 3,
      name: 'Head Warmer',
      price: '$489.00',
      tag: 'LIMITED DROP',
      image: '/images/head-warmer.jpeg',
    },
  ]

  return (
    <section className="bg-black py-20 px-8">
      <div className="max-w-7xl mx-auto">

        {/* Section Title */}
        <h2 className="text-red-500 text-xs tracking-[0.4em] uppercase mb-10">
          The Collection
        </h2>

        {/* Grid — Products + VIP */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

          {/* Products — 3 columns */}
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">

              {/* Image Box */}
              <div className="h-64 overflow-hidden border border-zinc-800 group-hover:border-red-500 transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                  className="group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Info */}
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-white text-xs tracking-widest uppercase font-bold">
                    {product.name}
                  </p>
                  <p className="text-zinc-400 text-xs mt-1">
                    {product.price}
                  </p>
                </div>
                <span className="bg-red-500 text-white text-[10px] tracking-widest px-2 py-1 uppercase">
                  {product.tag}
                </span>
              </div>

            </div>
          ))}

          {/* VIP Verification Box */}
          <div className="border border-zinc-800 p-6 flex flex-col justify-center gap-4">
            <div>
              <h3 className="text-white text-sm font-bold tracking-widest uppercase">
                VIP Verification
              </h3>
              <p className="text-zinc-500 text-xs tracking-wider mt-1">
                Signup for exclusions and accents.
              </p>
            </div>

            <input
              type="email"
              placeholder="Enter your address"
              className="bg-zinc-900 border border-zinc-700 text-white text-xs px-4 py-3 tracking-wider placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
            />

            <button className="bg-red-500 text-white text-xs tracking-[0.3em] uppercase py-3 hover:bg-red-600 transition-colors duration-300">
              [ REQUEST ACCESS ]
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Collection