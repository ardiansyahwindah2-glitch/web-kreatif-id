import { useState, useEffect, useMemo } from 'react'

const STORAGE_KEY = 'webkreatif_finance'

const paymentMethods = [
  'Tunai',
  'BCA', 'Mandiri', 'BNI', 'BRI', 'Bank Lain',
  'GoPay', 'OVO', 'Dana', 'LinkAja', 'ShopeePay',
]

const categories = [
  'Pembuatan Website',
  'Maintenance',
  'Domain & Hosting',
  'Desain',
  'Konsultasi',
  'Lainnya',
]

export { paymentMethods, categories }

export default function useFinance() {
  const [entries, setEntries] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const addEntry = (entry) => {
    setEntries(prev => [{ ...entry, id: Date.now(), date: entry.date || new Date().toISOString().slice(0, 10) }, ...prev])
  }

  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(e => e.id !== id))
  }

  const pemasukan = useMemo(() => entries.filter(e => e.type === 'masuk'), [entries])
  const pengeluaran = useMemo(() => entries.filter(e => e.type === 'keluar'), [entries])

  const totalPemasukan = useMemo(() => pemasukan.reduce((sum, e) => sum + Number(e.amount), 0), [pemasukan])
  const totalPengeluaran = useMemo(() => pengeluaran.reduce((sum, e) => sum + Number(e.amount), 0), [pengeluaran])
  const labaBersih = totalPemasukan - totalPengeluaran

  const byMonth = useMemo(() => {
    const map = {}
    entries.forEach(e => {
      const m = e.date ? e.date.slice(0, 7) : 'unknown'
      if (!map[m]) map[m] = { bulan: m, masuk: 0, keluar: 0 }
      map[m][e.type === 'masuk' ? 'masuk' : 'keluar'] += Number(e.amount)
    })
    return Object.values(map).sort((a, b) => a.bulan.localeCompare(b.bulan)).slice(-6)
  }, [entries])

  const byMethod = useMemo(() => {
    const map = {}
    entries.filter(e => e.type === 'masuk').forEach(e => {
      const m = e.method || 'Lainnya'
      map[m] = (map[m] || 0) + Number(e.amount)
    })
    return map
  }, [entries])

  return { entries, addEntry, deleteEntry, totalPemasukan, totalPengeluaran, labaBersih, byMonth, byMethod, pemasukan, pengeluaran, paymentMethods, categories }
}
