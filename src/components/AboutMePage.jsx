import { GoArrowLeft } from 'react-icons/go'
import ProfileCard from './ProfileCard'

export default function AboutMePage({ onBack }) {
  const skills = [
    'React',
    'Tailwind CSS',
    'Three.js',
    'GSAP',
    'Vite',
    'Node.js',
    'JavaScript',
    'HTML/CSS',
    'Figma',
  ]

  return (
    <div className="relative z-10 min-h-screen px-4 py-12 md:py-16 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-black/60 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-[0_0_60px_rgba(0,0,0,0.4)] border border-white/10">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white opacity-40 hover:opacity-80 transition-colors mb-6"
        >
          <GoArrowLeft className="text-lg" />
          <span className="text-sm">Kembali</span>
        </button>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          
          {/* Profile Card */}
          <div className="shrink-0 scale-90 md:scale-95">
            <ProfileCard
              name="WebKreatifID"
              title="Web Developer"
              handle="webkreatifid"
              avatarUrl="https://i.pinimg.com/736x/b4/c1/20/b4c12091458801f15cfa0e3df6727939.jpg"
              showUserInfo={false}
              enableTilt
              enableMobileTilt={false}
              onContactClick={() =>
                window.open('https://wa.me/6281234567890', '_blank')
              }
              behindGlowColor="rgba(255,255,255,0.12)"
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#0a0a0a 0%,#16161f 100%)"
            />
          </div>

          {/* Text Section */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-white opacity-90 mb-4 tracking-tight">
              Tentang Saya
            </h1>

            <p className="text-white opacity-60 leading-relaxed text-sm md:text-base mb-6 max-w-2xl">
              Pengembang web yang suka bikin website modern, responsif,
              interaktif, dan clean. Fokus di frontend development,
              animasi UI, dan pengalaman pengguna yang nyaman.
            </p>

            {/* Skills */}
            <h2 className="text-lg md:text-xl font-semibold text-white opacity-90 mb-4 tracking-tight">
              Skills
            </h2>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm rounded-xl bg-white/5 border border-white/10 text-white opacity-60 hover:bg-white/10 hover:opacity-80 transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}