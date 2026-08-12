import React from 'react'

export default function CosmicBackground() {
  return (
    <div
      className="cosmic-background-root"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#100B2E',
      }}
    >
      {/* High-Resolution Photorealistic Cosmic Universe Background Wallpaper */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/assets/novasathi-cosmic-bg.webp'), url('/novasathi-cosmic-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.90,
        }}
      />

      {/* Soft Light Cosmic Atmosphere Overlay for Content Readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 20%, rgba(250, 248, 255, 0.55) 0%, rgba(250, 248, 255, 0.20) 65%),
            linear-gradient(180deg, rgba(250, 248, 255, 0.30) 0%, rgba(244, 240, 255, 0.40) 100%)
          `,
        }}
      />
    </div>
  )
}
