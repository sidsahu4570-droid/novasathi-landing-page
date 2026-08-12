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
        background: '#12072E',
      }}
    >
      {/* High-Resolution Photorealistic Cosmic Universe Background Wallpaper — 95% Full Photographic Opacity */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/assets/novasathi-cosmic-bg.webp'), url('/novasathi-cosmic-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.95,
          filter: 'contrast(1.05) saturate(1.10)',
        }}
      />

      {/* Outer-Edge Celestial Planets & Zodiac Geometry (Off-Center Watermarks) */}
      {/* Upper-Right Outer Edge Saturn Planet */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          right: '3%',
          width: '56px',
          height: '56px',
          opacity: 0.80,
        }}
      >
        <svg viewBox="0 0 60 60" width="100%" height="100%">
          <circle cx="30" cy="30" r="14" fill="url(#saturnAtmosphere)" />
          <ellipse cx="30" cy="30" rx="26" ry="6" stroke="rgba(200, 155, 60, 0.75)" strokeWidth="2" fill="none" transform="rotate(-20, 30, 30)" />
          <defs>
            <radialGradient id="saturnAtmosphere" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#C89B3C" />
              <stop offset="60%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#4A29C7" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Lower-Left Outer Edge Crescent Moon */}
      <div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '2%',
          width: '42px',
          height: '42px',
          opacity: 0.70,
        }}
      >
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <path d="M 22 4 A 14 14 0 1 0 36 28 A 12 12 0 1 1 22 4 Z" fill="url(#moonAtmosphere)" />
          <defs>
            <linearGradient id="moonAtmosphere" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C89B3C" />
              <stop offset="100%" stopColor="#6D4AFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Faint Outer Edge Zodiac Wheel Watermark */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '540px',
          height: '540px',
          opacity: 0.08,
          pointerEvents: 'none',
          animation: 'spin-slow 90s linear infinite',
        }}
      >
        <svg viewBox="0 0 200 200" width="100%" height="100%">
          <circle cx="100" cy="100" r="95" stroke="#6D4AFF" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
          <circle cx="100" cy="100" r="80" stroke="#C89B3C" strokeWidth="0.6" fill="none" />
          <text x="100" y="14" fill="#6D4AFF" fontSize="7.5" textAnchor="middle" fontWeight="bold">
            ♈  ♉  ♊  ♋  ♌  ♍  ♎  ♏  ♐  ♑  ♒  ♓
          </text>
        </svg>
      </div>
    </div>
  )
}
