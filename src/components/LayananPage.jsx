import { GoArrowLeft } from 'react-icons/go'

const contents = {
  companyProfile: {
    title: "Website Company Profile",
    body: [
      "Website company profile adalah wajah digital bisnis Anda. Kami membuat website profil perusahaan yang profesional, informatif, dan menarik.",
      "Cocok untuk perusahaan, UKM, organisasi, maupun personal brand yang ingin tampil kredibel di dunia online.",
      "Fitur: desain eksklusif, halaman profil, layanan, portofolio, kontak, dan integrasi media sosial."
    ]
  },
  tokoOnline: {
    title: "Toko Online",
    body: [
      "Tingkatkan penjualan Anda dengan toko online modern dan responsif. Kami membangun platform e-commerce yang mudah dikelola.",
      "Dilengkapi dengan sistem manajemen produk, keranjang belanja, dan metode pembayaran yang terintegrasi.",
      "Cocok untuk bisnis fashion, makanan, elektronik, dan berbagai jenis usaha lainnya."
    ]
  },
  landingPage: {
    title: "Landing Page",
    body: [
      "Landing page dirancang untuk mengonversi pengunjung menjadi pelanggan. Fokus pada satu tujuan utama dengan desain yang memikat.",
      "Ideal untuk kampanye produk, event, webinar, atau layanan spesifik yang ingin dipromosikan secara efektif.",
      "Kami optimalkan kecepatan, responsivitas, dan copywriting agar landing page Anda menghasilkan konversi maksimal."
    ]
  }
}

export default function LayananPage({ service, onBack }) {
  const data = contents[service]

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
      <div className="w-full max-w-3xl bg-black/60 backdrop-blur-2xl rounded-3xl p-10 md:p-14 shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white opacity-40 hover:opacity-80 transition-colors mb-8"
        >
          <GoArrowLeft className="text-lg" />
          <span className="text-sm">Kembali</span>
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-white opacity-90 mb-6 tracking-tight">
          {data.title}
        </h1>

        <div className="space-y-5 text-white opacity-60 leading-relaxed text-base md:text-lg">
          {data.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  )
}