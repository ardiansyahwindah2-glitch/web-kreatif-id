import { GoArrowUpRight, GoCheck } from 'react-icons/go'
import { iconMap } from '../hooks/useProducts'

export default function HomeContent({ products, onAdminClick }) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <div className="relative z-10 text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white/90 mb-4 tracking-tight">
          Jasa Pembuatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Website</span>
        </h1>
        <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
          Website modern, responsif, dan interaktif untuk bisnis Anda. 
          Harga terjangkau dengan kualitas terbaik.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {products.map((product) => {
          const Icon = iconMap[product.icon]
          return (
            <div
              key={product.id}
              className="group bg-black/60 backdrop-blur-2xl rounded-2xl p-6 border border-white/10 hover:border-purple-500/40 transition-all duration-500 flex flex-col"
            >
              {product.image ? (
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
              ) : Icon ? (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                  <Icon className="text-2xl text-purple-400/80" />
                </div>
              ) : null}

              <h2 className="text-xl font-bold text-white/90 mb-2">{product.title}</h2>
              <p className="text-white/70 text-sm mb-4">{product.desc}</p>

              <div className="text-2xl font-bold text-white/90 mb-4">
                {product.price}
                <span className="text-sm font-normal text-white/60 ml-1">/paket</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {product.specs.map((spec) => (
                  <span
                    key={spec}
                    className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-white/70"
                  >
                    {spec}
                  </span>
                ))}
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wider">Fitur</h3>
                <ul className="space-y-2">
                  {product.fitur.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                      <GoCheck className="mt-0.5 text-purple-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
              >
                Pesan Sekarang
                <GoArrowUpRight />
              </a>
            </div>
          )
        })}
      </div>

      <div className="relative z-10 mt-16 flex flex-wrap justify-center gap-8 text-black/40 text-sm">
        <span className="text-black/60 font-medium">50+ Proyek Selesai</span>
        <span className="text-black/20">|</span>
        <span className="text-black/60 font-medium">30+ Klien Puas</span>
        <span className="text-black/20">|</span>
        <span className="text-black/60 font-medium">Garansi Revisi</span>
        <span className="text-black/20">|</span>
        <span className="text-black/60 font-medium">Dukungan 24/7</span>
      </div>

      {/* Admin footer */}
      <div className="relative z-10 mt-12 text-center">
        <button
          onClick={onAdminClick}
          className="text-black/20 hover:text-black/40 text-[11px] uppercase tracking-widest transition-all"
        >
          Masuk sebagai Admin
        </button>
      </div>
    </div>
  )
}
