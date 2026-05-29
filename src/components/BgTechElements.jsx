import { useEffect, useRef } from 'react'
import { GoBrowser, GoCode, GoGlobe, GoDeviceDesktop, GoTerminal, GoStack } from 'react-icons/go'

const icons = [
  { Icon: GoBrowser, label: 'browser' },
  { Icon: GoCode, label: 'code' },
  { Icon: GoGlobe, label: 'globe' },
  { Icon: GoDeviceDesktop, label: 'desktop' },
  { Icon: GoTerminal, label: 'terminal' },
  { Icon: GoStack, label: 'stack' },
]

export default function BgTechElements() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll('.tech-float')
    const total = items.length
    const anims = []

    items.forEach((el, i) => {
      const startX = Math.random() * 100
      const startY = Math.random() * 100
      const duration = 12 + Math.random() * 18
      const delay = -Math.random() * duration
      const driftX = (Math.random() - 0.5) * 60
      const driftY = (Math.random() - 0.5) * 60
      const rotate = (Math.random() - 0.5) * 20
      const scale = 0.6 + Math.random() * 0.6

      el.style.left = `${startX}%`
      el.style.top = `${startY}%`
      el.style.opacity = '0'
      el.style.transform = `translate(0, 0) rotate(0deg) scale(${scale})`

      const keyframes = [
        { opacity: 0, transform: `translate(0, 0) rotate(0deg) scale(${scale})` },
        { opacity: 0.15, transform: `translate(${driftX}px, ${driftY}px) rotate(${rotate}deg) scale(${scale})`, offset: 0.1 },
        { opacity: 0.15, transform: `translate(${-driftX}px, ${-driftY}px) rotate(${-rotate}deg) scale(${scale})`, offset: 0.9 },
        { opacity: 0, transform: `translate(0, 0) rotate(0deg) scale(${scale})` },
      ]

      const anim = el.animate(keyframes, {
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: Infinity,
        easing: 'ease-in-out',
      })
      anims.push(anim)
    })

    return () => anims.forEach(a => a.cancel())
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map(({ Icon, label }, i) => (
        <div
          key={label}
          className="tech-float absolute text-white/30"
          aria-hidden
        >
          <Icon className="w-8 h-8 md:w-10 md:h-10" />
        </div>
      ))}
    </div>
  )
}
