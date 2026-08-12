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
        background: '#060713',
      }}
    >
      {/* High-Resolution Photorealistic Cosmic Universe Background Wallpaper — 100% Full Opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/assets/novasathi-cosmic-bg.webp'), url('/novasathi-cosmic-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 1.0,
          filter: 'contrast(1.05) saturate(1.10)',
        }}
      />
    </div>
  )
}
