import React from 'react'

export default function ZodiacWheel() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '580px',
        height: '580px',
        opacity: 0.14,
        pointerEvents: 'none',
        animation: 'spin-slow 90s linear infinite',
      }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        {/* Outer & Inner Celestial Circles */}
        <circle cx="100" cy="100" r="95" stroke="#6650B8" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="82" stroke="#D2A84A" strokeWidth="0.6" fill="none" />
        <circle cx="100" cy="100" r="65" stroke="#6650B8" strokeWidth="0.6" fill="none" strokeDasharray="2 2" />
        <circle cx="100" cy="100" r="45" stroke="#D2A84A" strokeWidth="0.4" fill="none" />

        {/* 12 Astrological Division Lines */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="100"
            x2={100 + 95 * Math.cos((deg * Math.PI) / 180)}
            y2={100 + 95 * Math.sin((deg * Math.PI) / 180)}
            stroke="rgba(102, 80, 184, 0.4)"
            strokeWidth="0.4"
          />
        ))}

        {/* Zodiac Symbols Text Arc */}
        <text x="100" y="14" fill="#6650B8" fontSize="7.5" textAnchor="middle" fontWeight="bold">
          ♈  ♉  ♊  ♋  ♌  ♍  ♎  ♏  ♐  ♑  ♒  ♓
        </text>
      </svg>
    </div>
  )
}
