import { GoArrowUpRight, GoCheck, GoMail } from 'react-icons/go'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa'
import { iconMap } from '../hooks/useProducts'

export default function HomeContent({ products, settings }) {
  const wa = settings.whatsapp || '6281234567890'
  const ig = settings.instagram || 'webkreatifid'
  const tiktok = settings.tiktok || '@webkreatifid'
  const email = settings.email || 'hello@webkreatifid.com'
  const siteName = settings.siteName || 'WebKreatifID'

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-24">
      {/* Hero */}
      <div className="relative z-10 text-center mb-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-purple-600/20 blur-3xl rounded-full w-[200%] h-[200%] -top-1/2 -left-1/2" />
        <h1 className="text-4xl md:text-7xl font-bold text-white mb-4 tracking-tight leading-tight drop-shadow-[0_2px_20px_rgba(168,85,247,0.3)]">
          Jasa Pembuatan <br className="md:hidden" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
            Website
          </span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          Website modern, responsif, dan interaktif untuk bisnis Anda. 
          Harga terjangkau dengan kualitas terbaik.
        </p>
      </div>

      {/* Products */}
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
                href={`https://wa.me/${wa}?text=Halo%20${siteName}%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(product.title)}`}
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

      {/* Stats */}
      <div className="relative z-10 mt-16 flex flex-wrap justify-center gap-8 text-white/60 text-sm">
        <span className="text-white/80 font-medium">50+ Proyek Selesai</span>
        <span className="text-white/20">|</span>
        <span className="text-white/80 font-medium">30+ Klien Puas</span>
        <span className="text-white/20">|</span>
        <span className="text-white/80 font-medium">Garansi Revisi</span>
        <span className="text-white/20">|</span>
        <span className="text-white/80 font-medium">Dukungan 24/7</span>
      </div>

      {/* Contact Section */}
      <div className="relative z-10 mt-20 w-full max-w-3xl">
        <div className="bg-black/50 backdrop-blur-2xl rounded-3xl p-10 md:p-14 border border-white/10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Hubungi Kami</h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Kami siap membantu mewujudkan website impian Anda. 
            Konsultasi gratis tanpa biaya. Tim kami akan merespon dalam 1x24 jam.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-xl mx-auto mb-10">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-600/20 flex items-center justify-center">
                  <FaWhatsapp className="text-lg text-green-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">WhatsApp</p>
                  <p className="text-white/90 text-sm font-medium">{wa}</p>
                </div>
              </div>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="text-green-400 text-xs hover:text-green-300 transition-all">Chat Sekarang →</a>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-pink-600/20 flex items-center justify-center">
                  <FaInstagram className="text-lg text-pink-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">Instagram</p>
                  <p className="text-white/90 text-sm font-medium">@{ig.replace('@', '')}</p>
                </div>
              </div>
              <a href={`https://instagram.com/${ig.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-pink-400 text-xs hover:text-pink-300 transition-all">Ikuti Kami →</a>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <FaTiktok className="text-lg text-white/70" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">TikTok</p>
                  <p className="text-white/90 text-sm font-medium">@{tiktok.replace('@', '')}</p>
                </div>
              </div>
              <a href={`https://tiktok.com/@${tiktok.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-white/50 text-xs hover:text-white/70 transition-all">Ikuti Kami →</a>
            </div>
            <a href={`mailto:${email}?subject=Halo%20${siteName}%20-%20Saya%20ingin%20bertanya&body=Halo%20tim%20${siteName}%2C%0A%0ASaya%20tertarik%20dengan%20jasa%20pembuatan%20website.%20Bisa%20dibantu%20informasi%20lebih%20lanjut%3F%0A%0ATerima%20kasih.`} className="block bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer no-underline">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                  <GoMail className="text-lg text-blue-400" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider">Email</p>
                  <p className="text-white/90 text-sm font-medium break-all">{email}</p>
                </div>
              </div>
              <span className="text-blue-400 text-xs hover:text-blue-300 transition-all">Kirim Email →</span>
            </a>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Jam Operasional</p>
            <p className="text-white/70 text-sm">Senin - Jumat, 09:00 - 18:00 WIB</p>
            <p className="text-white/50 text-xs mt-1">Sabtu & Minggu: Konsultasi via WhatsApp</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-16 text-center space-y-2" style={{ color: '#fff' }}>
        <p className="text-sm opacity-40">{siteName}</p>
        <p className="text-xs opacity-30">Jasa Pembuatan Website &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  )
}
