import React from 'react'

export default function PlanetLayer() {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {/* Upper-Right Outer Edge — Ringed Abstract Celestial Object */}
      <div
        style={{
          position: 'absolute',
          top: '7%',
          right: '4%',
          width: '52px',
          height: '52px',
          opacity: 0.85,
        }}
      >
        <svg viewBox="0 0 60 60" width="100%" height="100%">
          <circle cx="30" cy="30" r="14" fill="url(#abstractPlanetGrad1)" />
          <ellipse cx="30" cy="30" rx="26" ry="6" stroke="rgba(210, 168, 74, 0.75)" strokeWidth="2" fill="none" transform="rotate(-20, 30, 30)" />
          <defs>
            <radialGradient id="abstractPlanetGrad1" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#DDD4FF" />
              <stop offset="55%" stopColor="#8D73E8" />
              <stop offset="100%" stopColor="#35215F" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Middle-Left Edge — Celestial Moon */}
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '2%',
          width: '38px',
          height: '38px',
          opacity: 0.75,
        }}
      >
        <svg viewBox="0 0 40 40" width="100%" height="100%">
          <path d="M 22 4 A 14 14 0 1 0 36 28 A 12 12 0 1 1 22 4 Z" fill="url(#abstractMoonGrad1)" />
          <defs>
            <linearGradient id="abstractMoonGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D2A84A" />
              <stop offset="100%" stopColor="#6650B8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower-Right Edge — Soft Purple Gas Giant Sphere */}
      <div
        style={{
          position: 'absolute',
          bottom: '14%',
          right: '3%',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 30%, #F8F5FF, #8D73E8 60%, #4C1D95)',
          boxShadow: '0 0 20px rgba(141, 115, 232, 0.30)',
          opacity: 0.80,
        }}
      />
    </div>
  )
}
