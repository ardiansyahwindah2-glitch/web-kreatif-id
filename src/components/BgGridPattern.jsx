export default function BgGridPattern() {
  return (
    <>
      {/* Grid lines */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Soft glowing orbs */}
      <div
        className="fixed pointer-events-none z-0 rounded-full"
        style={{
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(120,80,255,0.08), transparent 70%)',
          top: '-5%',
          right: '-5%',
        }}
      />
      <div
        className="fixed pointer-events-none z-0 rounded-full"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(255,80,180,0.06), transparent 70%)',
          bottom: '-10%',
          left: '-10%',
        }}
      />
    </>
  )
}
