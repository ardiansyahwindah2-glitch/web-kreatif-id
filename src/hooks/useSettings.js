import { useState, useEffect } from 'react'

const STORAGE_KEY = 'webkreatif_settings'

const defaults = {
  siteName: 'WebKreatifID',
  email: 'hello@webkreatifid.com',
  whatsapp: '6281234567890',
  instagram: 'webkreatifid',
  tiktok: '@webkreatifid',
}

export default function useSettings() {
  const [settings, setSettings] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? { ...defaults, ...JSON.parse(raw) } : defaults
    } catch { return defaults }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  return { settings, updateSetting }
}
