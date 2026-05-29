import { useState } from 'react'
import { GoHome, GoPackage, GoSignOut, GoTrash, GoPencil, GoPlus, GoX, GoCheck, GoDeviceDesktop, GoCreditCard, GoFileCode, GoNote, GoBriefcase, GoMortarBoard, GoLink, GoPerson, GoDatabase, GoMegaphone, GoGraph, GoCalendar, GoGear } from 'react-icons/go'
import { iconMap } from '../hooks/useProducts'
import useFinance, { paymentMethods, categories } from '../hooks/useFinance'
import useSettings from '../hooks/useSettings'

const emptyForm = {
  icon: 'companyProfile', title: '', desc: '', price: '',
  specs: ['', '', '', ''], fitur: [''], image: '',
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: GoHome },
  { id: 'products', label: 'Produk', icon: GoPackage },
  { id: 'finance', label: 'Keuangan', icon: GoCreditCard },
  { id: 'settings', label: 'Pengaturan', icon: GoGear },
]

export default function ManagePage({ products, addProduct, updateProduct, deleteProduct, onBack }) {
  const [tab, setTab] = useState('dashboard')
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [preview, setPreview] = useState(null)

  const { entries, addEntry, deleteEntry, totalPemasukan, totalPengeluaran, labaBersih, byMonth } = useFinance()
  const { settings, updateSetting } = useSettings()

  const [showFinanceForm, setShowFinanceForm] = useState(false)
  const [financeForm, setFinanceForm] = useState({ type: 'masuk', amount: '', desc: '', method: 'Tunai', category: 'Pembuatan Website', date: new Date().toISOString().slice(0, 10) })

  const totalProducts = products.length
  const totalFitur = products.reduce((sum, p) => sum + p.fitur.length, 0)
  const maxMonth = Math.max(...byMonth.map(m => m.masuk + m.keluar), 1)

  const openAdd = () => {
    setEditing(null)
    setForm({ ...emptyForm, icon: Object.keys(iconMap)[0] })
    setPreview(null)
    setShowForm(true)
  }

  const openEdit = (product) => {
    setEditing(product.id)
    setForm({
      icon: product.icon, title: product.title, desc: product.desc,
      price: product.price, specs: [...product.specs], fitur: [...product.fitur],
      image: product.image || '',
    })
    setPreview(product.image || null)
    setShowForm(true)
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setForm(prev => ({ ...prev, image: ev.target.result }))
      setPreview(ev.target.result)
    }
    reader.readAsDataURL(file)
  }

  const save = () => {
    if (!form.title.trim()) return
    const data = { ...form, specs: form.specs.filter(Boolean), fitur: form.fitur.filter(Boolean) }
    if (editing) updateProduct(editing, data)
    else addProduct({ ...data, id: 'prod_' + Date.now() })
    setShowForm(false)
    setForm({ ...emptyForm })
    setPreview(null)
  }

  const confirmDelete = (product) => {
    if (window.confirm(`Hapus "${product.title}"?`)) deleteProduct(product.id)
  }

  const iconOptions = Object.keys(iconMap)

  const handleLogout = () => {
    sessionStorage.removeItem('manage_auth')
    onBack()
  }

  const formatRp = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`

  const handleFinanceSubmit = () => {
    if (!financeForm.amount || !financeForm.desc) return
    addEntry({ ...financeForm, amount: Number(financeForm.amount) })
    setFinanceForm({ type: 'masuk', amount: '', desc: '', method: 'Tunai', category: 'Pembuatan Website', date: new Date().toISOString().slice(0, 10) })
    setShowFinanceForm(false)
  }

  return (
    <div className="relative z-10 min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-black/60 backdrop-blur-2xl border-r border-white/10 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h1 className="text-white/90 font-bold text-sm">Dashboard Admin</h1>
          <p className="text-white/30 text-xs mt-0.5">{settings.siteName}</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                tab === item.id
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon className="text-lg" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-white/10 space-y-1">
          <button
            onClick={onBack}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all"
          >
            <GoHome className="text-lg" />
            Kembali ke Beranda
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <GoSignOut className="text-lg" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto max-h-screen">
        {/* === DASHBOARD === */}
        {tab === 'dashboard' && (
          <div>
            <h2 className="text-2xl font-bold text-white/90 mb-6">Dashboard</h2>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/40 text-xs uppercase tracking-wider">Total Produk</span>
                  <GoPackage className="text-purple-400/60 text-xl" />
                </div>
                <div className="text-3xl font-bold text-white/90">{totalProducts}</div>
              </div>
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/40 text-xs uppercase tracking-wider">Pemasukan</span>
                  <GoCreditCard className="text-green-400/60 text-xl" />
                </div>
                <div className="text-2xl font-bold text-green-400">{formatRp(totalPemasukan)}</div>
              </div>
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/40 text-xs uppercase tracking-wider">Pengeluaran</span>
                  <GoCreditCard className="text-red-400/60 text-xl" />
                </div>
                <div className="text-2xl font-bold text-red-400">{formatRp(totalPengeluaran)}</div>
              </div>
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/40 text-xs uppercase tracking-wider">Laba Bersih</span>
                  <GoGraph className={`text-xl ${labaBersih >= 0 ? 'text-green-400/60' : 'text-red-400/60'}`} />
                </div>
                <div className={`text-2xl font-bold ${labaBersih >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatRp(labaBersih)}</div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
              <h3 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">Grafik Pemasukan & Pengeluaran</h3>
              {byMonth.length === 0 ? (
                <p className="text-white/30 text-sm">Belum ada data keuangan.</p>
              ) : (
                <div className="flex items-end gap-3 h-40">
                  {byMonth.map(m => {
                    const masukH = (m.masuk / maxMonth) * 100
                    const keluarH = (m.keluar / maxMonth) * 100
                    return (
                      <div key={m.bulan} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex flex-col items-center justify-end h-32 gap-0.5">
                          <div className="w-full bg-green-500/40 rounded-t" style={{ height: `${Math.max(masukH, 0.5)}%` }} title={`Masuk: ${formatRp(m.masuk)}`} />
                          <div className="w-full bg-red-500/40 rounded-t" style={{ height: `${Math.max(keluarH, 0.5)}%` }} title={`Keluar: ${formatRp(m.keluar)}`} />
                        </div>
                        <span className="text-white/30 text-[10px]">{m.bulan.slice(5)}</span>
                      </div>
                    )
                  })}
                </div>
              )}
              <div className="flex gap-4 mt-4 text-xs text-white/40">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-green-500/40" /> Pemasukan</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500/40" /> Pengeluaran</span>
              </div>
            </div>

            {/* Recent products */}
            <h3 className="text-lg font-semibold text-white mb-4">Produk Terbaru</h3>
            <div className="space-y-3">
              {products.slice(-5).reverse().map(product => {
                const Icon = iconMap[product.icon]
                return (
                  <div key={product.id} className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/5 flex items-center gap-4">
                    {product.image ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <img src={product.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ) : Icon ? (
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0">
                        <Icon className="text-lg text-purple-400/60" />
                      </div>
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{product.title}</div>
                      <div className="text-white/30 text-xs">{product.price}</div>
                    </div>
                    <div className="text-white/20 text-xs">{product.fitur.length} fitur</div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* === PRODUCTS === */}
        {tab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white/90">Produk</h2>
              <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all">
                <GoPlus className="text-lg" /> Tambah Produk
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product) => {
                const Icon = iconMap[product.icon]
                return (
                  <div key={product.id} className="bg-black/50 backdrop-blur-xl rounded-2xl p-4 border border-white/10 flex gap-4 items-start hover:border-purple-500/30 transition-all">
                    {product.image ? (
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0"><img src={product.image} alt="" className="w-full h-full object-cover" /></div>
                    ) : Icon ? (
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center shrink-0"><Icon className="text-xl text-purple-400/80" /></div>
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white/90 font-semibold text-sm truncate">{product.title}</h3>
                      <p className="text-white/40 text-xs mt-0.5">{product.price}</p>
                      <p className="text-white/20 text-xs mt-1">{product.fitur.length} fitur</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => openEdit(product)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"><GoPencil /></button>
                      <button onClick={() => confirmDelete(product)} className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all"><GoTrash /></button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* === FINANCE === */}
        {tab === 'finance' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white/90">Keuangan</h2>
              <button onClick={() => setShowFinanceForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all">
                <GoPlus className="text-lg" /> Tambah
              </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <span className="text-white/40 text-xs uppercase tracking-wider">Pemasukan</span>
                <div className="text-2xl font-bold text-green-400 mt-1">{formatRp(totalPemasukan)}</div>
              </div>
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <span className="text-white/40 text-xs uppercase tracking-wider">Pengeluaran</span>
                <div className="text-2xl font-bold text-red-400 mt-1">{formatRp(totalPengeluaran)}</div>
              </div>
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <span className="text-white/40 text-xs uppercase tracking-wider">Laba</span>
                <div className={`text-2xl font-bold mt-1 ${labaBersih >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatRp(labaBersih)}</div>
              </div>
            </div>

            {/* Grafik bulanan */}
            <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-8">
              <h3 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">Grafik Bulanan</h3>
              {byMonth.length === 0 ? (
                <p className="text-white/30 text-sm">Belum ada data.</p>
              ) : (
                <div className="flex items-end gap-3 h-40">
                  {byMonth.map(m => {
                    const total = m.masuk + m.keluar
                    const masukH = (m.masuk / Math.max(maxMonth, 1)) * 100
                    const keluarH = (m.keluar / Math.max(maxMonth, 1)) * 100
                    return (
                      <div key={m.bulan} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full flex flex-col items-center justify-end h-32 gap-0.5">
                          <div className="w-full bg-green-500/40 rounded-t" style={{ height: `${Math.max(masukH, 0.5)}%` }} title={`Masuk: ${formatRp(m.masuk)}`} />
                          <div className="w-full bg-red-500/40 rounded-t" style={{ height: `${Math.max(keluarH, 0.5)}%` }} title={`Keluar: ${formatRp(m.keluar)}`} />
                        </div>
                        <span className="text-white/30 text-[10px]">{m.bulan.slice(5)}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Tabel riwayat */}
            <h3 className="text-sm font-semibold text-white/70 mb-4 uppercase tracking-wider">Riwayat</h3>
            <div className="space-y-2">
              {entries.length === 0 && <p className="text-white/30 text-sm">Belum ada transaksi.</p>}
              {entries.map(e => (
                <div key={e.id} className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/5 flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${e.type === 'masuk' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">{e.desc}</div>
                    <div className="text-white/30 text-xs">{e.date} · {e.category} · {e.method}</div>
                  </div>
                  <div className={`text-sm font-semibold shrink-0 ${e.type === 'masuk' ? 'text-green-400' : 'text-red-400'}`}>
                    {e.type === 'masuk' ? '+' : '-'}{formatRp(e.amount)}
                  </div>
                  <button onClick={() => { if (window.confirm('Hapus transaksi ini?')) deleteEntry(e.id) }} className="text-white/20 hover:text-red-400 transition-all"><GoTrash className="text-sm" /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === SETTINGS === */}
        {tab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold text-white/90 mb-6">Pengaturan Website</h2>
            <div className="max-w-xl">
              <div className="bg-black/50 backdrop-blur-xl rounded-2xl p-6 border border-white/10 space-y-5">
                <div>
                  <label className="text-sm text-white/80 block mb-1.5">Nama Website</label>
                  <input value={settings.siteName} onChange={e => updateSetting('siteName', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                </div>
                <div>
                  <label className="text-sm text-white/80 block mb-1.5">Email</label>
                  <input value={settings.email} onChange={e => updateSetting('email', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                </div>
                <div>
                  <label className="text-sm text-white/80 block mb-1.5">WhatsApp (nomor)</label>
                  <input value={settings.whatsapp} onChange={e => updateSetting('whatsapp', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white text-sm focus:outline-none focus:border-purple-500/50" placeholder="62812xxxxxx" />
                </div>
                <div>
                  <label className="text-sm text-white/80 block mb-1.5">Instagram (username)</label>
                  <input value={settings.instagram} onChange={e => updateSetting('instagram', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                </div>
                <div>
                  <label className="text-sm text-white/80 block mb-1.5">TikTok</label>
                  <input value={settings.tiktok} onChange={e => updateSetting('tiktok', e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/15 border border-white/20 text-white text-sm focus:outline-none focus:border-purple-500/50" />
                </div>
              </div>
              <p className="text-white/30 text-xs mt-3">Data tersimpan otomatis di localStorage.</p>
            </div>
          </div>
        )}
      </main>

      {/* Modal Add/Edit Product */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-zinc-900 rounded-2xl p-6 border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white/90">{editing ? 'Edit Produk' : 'Tambah Produk'}</h2>
              <button onClick={() => { setShowForm(false); setPreview(null) }} className="text-white/40 hover:text-white"><GoX className="text-xl" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 block mb-1">Foto Produk</label>
                <div className="flex items-center gap-4">
                  {preview && <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10"><img src={preview} alt="" className="w-full h-full object-cover" /></div>}
                  <label className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/70 text-sm cursor-pointer transition-all">Pilih File<input type="file" accept="image/*" onChange={handleImage} className="hidden" /></label>
                  {form.image && <button onClick={() => { setForm(prev => ({ ...prev, image: '' })); setPreview(null) }} className="text-xs text-red-400 hover:text-red-300">Hapus</button>}
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1">Ikon</label>
                <select value={form.icon} onChange={e => setForm(prev => ({ ...prev, icon: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50">
                  {iconOptions.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1">Judul</label>
                <input value={form.title} onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" placeholder="Nama produk" />
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1">Deskripsi</label>
                <textarea value={form.desc} onChange={e => setForm(prev => ({ ...prev, desc: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 resize-none" rows={2} placeholder="Deskripsi produk" />
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1">Harga</label>
                <input value={form.price} onChange={e => setForm(prev => ({ ...prev, price: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" placeholder="Rp xxx.xxx" />
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1">Spek</label>
                {form.specs.map((s, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={s} onChange={e => { const n = [...form.specs]; n[i] = e.target.value; setForm(prev => ({ ...prev, specs: n })) }} className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" placeholder={`Spek ${i + 1}`} />
                    {form.specs.length > 1 && <button onClick={() => setForm(prev => ({ ...prev, specs: prev.specs.filter((_, j) => j !== i) }))} className="text-red-400 hover:text-red-300 px-2"><GoX /></button>}
                  </div>
                ))}
                <button onClick={() => setForm(prev => ({ ...prev, specs: [...prev.specs, ''] }))} className="text-xs text-purple-400 hover:text-purple-300">+ Tambah spek</button>
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1">Fitur</label>
                {form.fitur.map((f, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <input value={f} onChange={e => { const n = [...form.fitur]; n[i] = e.target.value; setForm(prev => ({ ...prev, fitur: n })) }} className="flex-1 px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" placeholder={`Fitur ${i + 1}`} />
                    {form.fitur.length > 1 && <button onClick={() => setForm(prev => ({ ...prev, fitur: prev.fitur.filter((_, j) => j !== i) }))} className="text-red-400 hover:text-red-300 px-2"><GoX /></button>}
                  </div>
                ))}
                <button onClick={() => setForm(prev => ({ ...prev, fitur: [...prev.fitur, ''] }))} className="text-xs text-purple-400 hover:text-purple-300">+ Tambah fitur</button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowForm(false); setPreview(null) }} className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/70 text-sm hover:bg-white/15 transition-all">Batal</button>
              <button onClick={save} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all">{editing ? 'Simpan' : 'Tambah'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Finance */}
      {showFinanceForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowFinanceForm(false)}>
          <div className="w-full max-w-sm bg-zinc-900 rounded-2xl p-6 border border-white/10" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white/90">Tambah Transaksi</h2>
              <button onClick={() => setShowFinanceForm(false)} className="text-white/40 hover:text-white"><GoX className="text-xl" /></button>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2">
                <button onClick={() => setFinanceForm(prev => ({ ...prev, type: 'masuk' }))} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${financeForm.type === 'masuk' ? 'bg-green-600 text-white' : 'bg-white/10 text-white/50'}`}>Pemasukan</button>
                <button onClick={() => setFinanceForm(prev => ({ ...prev, type: 'keluar' }))} className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${financeForm.type === 'keluar' ? 'bg-red-600 text-white' : 'bg-white/10 text-white/50'}`}>Pengeluaran</button>
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Jumlah</label>
                <input type="number" value={financeForm.amount} onChange={e => setFinanceForm(prev => ({ ...prev, amount: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" placeholder="Rp" />
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Keterangan</label>
                <input value={financeForm.desc} onChange={e => setFinanceForm(prev => ({ ...prev, desc: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" placeholder="Mis: Pembayaran website" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-white/60 block mb-1.5">Kategori</label>
                  <select value={financeForm.category} onChange={e => setFinanceForm(prev => ({ ...prev, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/60 block mb-1.5">Metode</label>
                  <select value={financeForm.method} onChange={e => setFinanceForm(prev => ({ ...prev, method: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50">
                    {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Tanggal</label>
                <input type="date" value={financeForm.date} onChange={e => setFinanceForm(prev => ({ ...prev, date: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowFinanceForm(false)} className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/70 text-sm hover:bg-white/15 transition-all">Batal</button>
              <button onClick={handleFinanceSubmit} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold hover:from-purple-500 hover:to-pink-500 transition-all">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
