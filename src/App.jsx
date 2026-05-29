import { useState } from 'react'
import { GoX, GoShieldLock } from 'react-icons/go'
import CardNav from './components/CardNav'
import CompanyPage from './components/CompanyPage'
import AboutMePage from './components/AboutMePage'
import LayananPage from './components/LayananPage'
import ManagePage from './components/ManagePage'
import LiquidEther from './LiquidEther'
import SoftAurora from './components/SoftAurora'
import BgGridPattern from './components/BgGridPattern'
import HomeContent from './components/HomeContent'
import useProducts from './hooks/useProducts'
import useSettings from './hooks/useSettings'
import logo from './logo.svg'

const App = () => {
  const [page, setPage] = useState('home')
  const [service, setService] = useState(null)
  const { products, addProduct, updateProduct, deleteProduct } = useProducts()
  const { settings } = useSettings()

  const [authed, setAuthed] = useState(() => sessionStorage.getItem('manage_auth') === 'true')
  const [showLogin, setShowLogin] = useState(false)
  const [loginPwd, setLoginPwd] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleLogin = () => {
    if (loginPwd === 'salmanwebkreatifid') {
      sessionStorage.setItem('manage_auth', 'true')
      setAuthed(true)
      setShowLogin(false)
      setLoginPwd('')
      setLoginError('')
      setPage('manage')
    } else {
      setLoginError('Password salah!')
    }
  }

  const openLogin = () => {
    if (sessionStorage.getItem('manage_auth') === 'true') {
      setAuthed(true)
      setPage('manage')
    } else {
      setAuthed(false)
      setShowLogin(true)
      setLoginPwd('')
      setLoginError('')
    }
  }

  const items = [
    {
      label: "Profil",
      bgColor: "rgba(27,23,34,0.9)",
      textColor: "#fff",
      links: [
        { label: "Company", page: 'company', ariaLabel: "Tentang Perusahaan" },
        { label: "About Me", page: 'aboutme', ariaLabel: "Tentang Saya" }
      ]
    },
    {
      label: "Layanan",
      bgColor: "rgba(47,41,58,0.9)",
      textColor: "#fff",
      links: [
        { label: "Website Company Profile", page: 'companyProfile', ariaLabel: "Company Profile" },
        { label: "Toko Online", page: 'tokoOnline', ariaLabel: "Online Store" },
        { label: "Landing Page", page: 'landingPage', ariaLabel: "Landing Page" }
      ]
    },
    {
      label: "Admin",
      bgColor: "rgba(88,28,135,0.6)",
      textColor: "#fff",
      links: [
        { label: "Masuk sebagai Admin", page: 'admin', ariaLabel: "Login Admin" }
      ]
    },
  ];

  return (
    <div className="relative w-full min-h-screen">
      <div className="fixed inset-0">
        <SoftAurora
          color1="#f7f7f7"
          color2="#e100ff"
          speed={0.6}
          brightness={1.0}
          enableMouseInteraction
        />
        <BgGridPattern />
      </div>

      {page === 'home' && (
        <>
          <CardNav
            logo={logo}
            logoAlt="WebKreatifID Logo"
            items={items}
            baseColor="rgba(15,12,41,0.7)"
            menuColor="#fff"
            ease="power3.out"
            onNavLink={(link) => {
              if (['company', 'aboutme'].includes(link.page)) {
                setPage(link.page)
              } else if (['companyProfile', 'tokoOnline', 'landingPage'].includes(link.page)) {
                setService(link.page)
                setPage('layanan')
              } else if (link.page === 'admin') {
                openLogin()
              } else {
                setPage(link.page)
              }
            }}
          />
          <HomeContent products={products} settings={settings} />
        </>
      )}
      {page === 'company' && (
        <CompanyPage onBack={() => setPage('home')} />
      )}
      {page === 'aboutme' && (
        <AboutMePage onBack={() => setPage('home')} />
      )}
      {page === 'layanan' && (
        <LayananPage service={service} onBack={() => setPage('home')} />
      )}
      {page === 'manage' && authed && (
        <ManagePage
          products={products}
          addProduct={addProduct}
          updateProduct={updateProduct}
          deleteProduct={deleteProduct}
          onBack={() => setPage('home')}
        />
      )}

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowLogin(false)}>
          <div
            className="w-full max-w-sm bg-zinc-900 rounded-2xl p-8 border border-white/10 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <GoShieldLock className="text-2xl text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-white/90 text-center mb-2">Masuk sebagai Admin</h2>
            <p className="text-white/40 text-sm text-center mb-6">Masukkan password untuk mengakses dashboard</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Password</label>
                <input
                  type="password"
                  value={loginPwd}
                  onChange={(e) => { setLoginPwd(e.target.value); setLoginError('') }}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-purple-500/50 transition-all"
                  placeholder="••••••••"
                  autoFocus
                />
                {loginError && (
                  <p className="text-red-400 text-xs mt-1.5">{loginError}</p>
                )}
              </div>
              <button
                onClick={handleLogin}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all"
              >
                Masuk
              </button>
            </div>

            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-white/30 hover:text-white/70"
            >
              <GoX className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App