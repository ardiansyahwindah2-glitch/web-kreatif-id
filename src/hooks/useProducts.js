import { useState, useEffect } from 'react'
import { GoDeviceDesktop, GoCreditCard, GoFileCode, GoNote, GoBriefcase, GoMortarBoard, GoLink, GoPerson, GoDatabase, GoMegaphone } from 'react-icons/go'

const iconMap = {
  companyProfile: GoDeviceDesktop,
  tokoOnline: GoCreditCard,
  landingPage: GoFileCode,
  coffeeShop: GoNote,
  portfolio: GoBriefcase,
  sekolah: GoMortarBoard,
  bioPage: GoLink,
  formRegistrasi: GoPerson,
  crudApp: GoDatabase,
  landingEvent: GoMegaphone,
}

const defaultProducts = [
  {
    id: 'companyProfile',
    icon: 'companyProfile',
    title: 'Website Company Profile',
    desc: 'Website profesional untuk profil perusahaan, UKM, atau personal brand.',
    price: 'Rp 1.500.000',
    specs: ['1 Halaman Utama', 'Desain Responsif', 'Hosting 1 Tahun', 'Domain .com 1 Tahun'],
    fitur: [
      'Desain eksklusif sesuai brand',
      'Halaman profil perusahaan',
      'Halaman layanan/jasa',
      'Portofolio',
      'Kontak & Google Maps',
      'Integrasi media sosial',
      'Form kontak interaktif',
      'Optimasi SEO dasar',
      'Animasi halus (GSAP)',
    ],
    image: '',
  },
  {
    id: 'tokoOnline',
    icon: 'tokoOnline',
    title: 'Toko Online',
    desc: 'Platform e-commerce modern untuk meningkatkan penjualan bisnis Anda.',
    price: 'Rp 3.500.000',
    specs: [' hingga 50 Produk', 'Desain Responsif', 'Hosting 1 Tahun', 'Domain .com 1 Tahun'],
    fitur: [
      'Manajemen produk & kategori',
      'Keranjang belanja',
      'Checkout & pembayaran',
      'Manajemen pesanan',
      'Halaman produk detail',
      'Pencarian produk',
      'Filter & sorting',
      'Optimasi SEO e-commerce',
      'Dashboard admin',
    ],
    image: '',
  },
  {
    id: 'landingPage',
    icon: 'landingPage',
    title: 'Landing Page',
    desc: 'Halaman konversi tinggi untuk kampanye, event, atau promosi produk.',
    price: 'Rp 800.000',
    specs: ['1 Halaman', 'Desain Responsif', 'Optimasi Konversi', 'Hosting 1 Tahun'],
    fitur: [
      'Desain fokus konversi',
      'Copywriting profesional',
      'CTA strategis',
      'Form lead capture',
      'Integrasi WhatsApp',
      'Animasi engagement',
      'Optimasi kecepatan',
      'Tracking siap pasang',
      'Hosting gratis 1 tahun',
    ],
    image: '',
  },
  {
    id: 'coffeeShop',
    icon: 'coffeeShop',
    title: 'Website Coffee Shop',
    desc: 'Website modern untuk kafe, restoran, atau tempat usaha kuliner.',
    price: 'Rp 750.000',
    specs: ['1 Halaman', 'Desain Responsif', 'Menu Digital', 'Hosting 1 Tahun'],
    fitur: [
      'Desain tema coffee/culinary',
      'Menu makanan & minuman digital',
      'Galeri foto produk',
      'Lokasi & Google Maps',
      'Integrasi WhatsApp order',
      'Jam operasional',
      'Testimoni pelanggan',
      'Linktree-style bio',
      'Hosting gratis 1 tahun',
    ],
    image: '',
  },
  {
    id: 'portfolio',
    icon: 'portfolio',
    title: 'Website Portofolio',
    desc: 'Portofolio online untuk kreator, fotografer, desainer, dan freelancer.',
    price: 'Rp 600.000',
    specs: ['1 Halaman', 'Desain Responsif', 'Galeri Projek', 'Hosting 1 Tahun'],
    fitur: [
      'Tampilan portofolio grid',
      'Galeri gambar & video',
      'Halaman tentang saya',
      'Kontak & sosial media',
      'Filter kategori proyek',
      'Animasi scroll halus',
      'Desain minimalis modern',
      'Optimasi loading gambar',
      'Hosting gratis 1 tahun',
    ],
    image: '',
  },
  {
    id: 'sekolah',
    icon: 'sekolah',
    title: 'Website Sekolah',
    desc: 'Website profil untuk sekolah, bimbel, kursus, atau lembaga pendidikan.',
    price: 'Rp 1.200.000',
    specs: ['5 Halaman', 'Desain Responsif', 'Hosting 1 Tahun', 'Domain .sch.id'],
    fitur: [
      'Profil sekolah/lembaga',
      'Informasi pendaftaran',
      'Fasilitas & galeri',
      'Tenaga pengajar',
      'Jadwal akademik',
      'Prestasi & berita',
      'Form pendaftaran online',
      'Kontak & lokasi',
      'Hosting gratis 1 tahun',
    ],
    image: '',
  },
  {
    id: 'bioPage',
    icon: 'bioPage',
    title: 'Personal Bio / Link Page',
    desc: 'Halaman bio sederhana dengan tautan sosial media — cocok untuk anak RPL.',
    price: 'Rp 50.000',
    specs: ['1 Halaman', 'Responsif', 'Link Sosmed', 'Hosting Gratis'],
    fitur: [
      'Desain clean minimalis',
      'Foto profil & nama',
      'Link Instagram, GitHub, LinkedIn',
      'Tombol WhatsApp',
      'Hosting gratis selamanya',
      'Custom domain siap',
      'Bisa diedit kapan aja',
      'Ringan & loading cepat',
    ],
    image: '',
  },
  {
    id: 'formRegistrasi',
    icon: 'formRegistrasi',
    title: 'Form Registrasi Online',
    desc: 'Form pendaftaran online untuk event, kelas, atau komunitas.',
    price: 'Rp 100.000',
    specs: ['1 Halaman', 'Form Dinamis', 'Database', 'Hosting Gratis'],
    fitur: [
      'Form registrasi interaktif',
      'Penyimpanan data otomatis',
      'Export data peserta',
      'Konfirmasi via WhatsApp',
      'Batas kuota peserta',
      'Admin panel sederhana',
      'Hosting gratis 1 tahun',
    ],
    image: '',
  },
  {
    id: 'crudApp',
    icon: 'crudApp',
    title: 'Aplikasi CRUD Sederhana',
    desc: 'Aplikasi web dengan fitur Create, Read, Update, Delete — tugas RPL.',
    price: 'Rp 200.000',
    specs: ['Multi Halaman', 'Database', 'Admin Panel', 'Hosting Gratis'],
    fitur: [
      'CRUD data (tambah/edit/hapus)',
      'Database MySQL/sqlite',
      'Pencarian data',
      'Export laporan Excel/PDF',
      'Login multi user',
      'Tampilan responsif',
      'Source code lengkap',
      'Hosting gratis 1 tahun',
    ],
    image: '',
  },
  {
    id: 'landingEvent',
    icon: 'landingEvent',
    title: 'Landing Page Event',
    desc: 'Halaman promosi untuk event sekolah, seminar, atau workshop.',
    price: 'Rp 150.000',
    specs: ['1 Halaman', 'Countdown', 'Form Daftar', 'Hosting Gratis'],
    fitur: [
      'Desain tematik event',
      'Hitung mundur otomatis',
      'Info pembicara/jadwal',
      'Tombol registrasi',
      'Integrasi WhatsApp',
      'Galeri foto event',
      'Link sponsor',
      'Hosting gratis 1 tahun',
    ],
    image: '',
  },
]

const STORAGE_KEY = 'webkreatif_products'

function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return null
}

export { iconMap, defaultProducts }

export default function useProducts() {
  const [products, setProducts] = useState(() => loadProducts() || defaultProducts)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products])

  const addProduct = (product) => {
    const newId = 'prod_' + Date.now()
    setProducts(prev => [...prev, { ...product, id: newId }])
  }

  const updateProduct = (id, data) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const resetProducts = () => {
    setProducts(defaultProducts)
  }

  return { products, addProduct, updateProduct, deleteProduct, resetProducts }
}
