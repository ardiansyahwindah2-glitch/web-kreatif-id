import { GoArrowLeft } from 'react-icons/go'
import companyPhoto from '../assets/ChatGPT Image 28 Mei 2026, 16.58.25.png'

export default function CompanyPage({ onBack }) {
  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
      <div className="w-full max-w-4xl bg-black/60 backdrop-blur-2xl rounded-3xl p-10 md:p-14 shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white opacity-40 hover:opacity-80 transition-colors mb-8"
        >
          <GoArrowLeft className="text-lg" />
          <span className="text-sm">Kembali</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white opacity-90 mb-6 tracking-tight">
              Tentang Perusahaan
            </h1>
            <div className="space-y-4 text-white opacity-60 leading-relaxed text-base md:text-lg">
              <p>
                <span className="text-white opacity-90 font-semibold">WebKreatifID</span> adalah
                perusahaan jasa pembuatan website yang berdedikasi untuk membantu bisnis
                dan brand memiliki kehadiran online yang profesional dan modern.
              </p>
              <p>
                Kami percaya bahwa setiap bisnis berhak mendapatkan website berkualitas
                tinggi tanpa harus merogoh biaya besar. Dengan pendekatan desain yang
                kreatif dan teknologi terkini, kami menciptakan website yang menarik,
                fungsional, dan responsif.
              </p>
              <p>
                Tim kami terdiri dari para profesional berpengalaman di bidang desain web,
                pengembangan front-end, dan optimasi pengalaman pengguna.
              </p>
              <p className="text-white opacity-80 font-medium pt-2">
                WebKreatifID — partner terbaik Anda untuk membangun website impian.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="aspect-square rounded-2xl border border-white/10 overflow-hidden">
              <img src={companyPhoto} alt="WebKreatifID" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white opacity-80">50+</div>
                  <div className="text-xs text-white opacity-40">Proyek Selesai</div>
                </div>
              </div>
              <div className="aspect-square rounded-2xl bg-gradient-to-bl from-pink-500/20 to-orange-500/20 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white opacity-80">30+</div>
                  <div className="text-xs text-white opacity-40">Klien Puas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}