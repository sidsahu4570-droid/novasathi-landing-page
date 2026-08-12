import React from 'react'

export default function CosmicPlanets() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Upper-Right Outer Edge — Abstract Saturn Ringed Celestial Object */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          right: '4%',
          width: '54px',
          height: '54px',
          opacity: 0.85,
        }}
      >
        <svg viewBox="0 0 60 60" width="100%" height="100%">
          <circle cx="30" cy="30" r="14" fill="url(#planetGradient1)" />
          <ellipse cx="30" cy="30" rx="26" ry="6" stroke="rgba(200, 155, 60, 0.75)" strokeWidth="2" fill="none" transform="rotate(-20, 30, 30)" />
          <defs>
            <radialGradient id="planetGradient1" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#D8C7FF" />
              <stop offset="55%" stopColor="#7552C7" />
              <stop offset="100%" stopColor="#35215F" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Middle-Left Outer Edge — Celestial Crescent Moon */}
      <div
        style={{
          position: 'absolute',
          top: '46%',
          left: '2%',
          width: '40px',
          height: '40px',
          opacity: 0.75,
        }}
      >
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <path d="M 22 4 A 14 14 0 1 0 36 28 A 12 12 0 1 1 22 4 Z" fill="url(#moonGradient1)" />
          <defs>
            <linearGradient id="moonGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C89B3C" />
              <stop offset="100%" stopColor="#6D4AFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower-Right Outer Edge — Lavender Gas Sphere */}
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '3%',
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #E9D5FF, #8B5CF6 60%, #4C1D95)',
          boxShadow: '0 0 24px rgba(139, 92, 246, 0.30)',
          opacity: 0.80,
        }}
      />
    </div>
  )
}
