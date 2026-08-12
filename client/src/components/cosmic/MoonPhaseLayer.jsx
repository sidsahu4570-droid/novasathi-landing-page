import React from 'react'

export default function MoonPhaseLayer() {
  return (
    <svg
      style={{
        position: 'absolute',
        bottom: '8%',
        left: '5%',
        width: '180px',
        height: '30px',
        pointerEvents: 'none',
        opacity: 0.22,
      }}
    >
      <g stroke="#6650B8" strokeWidth="1" fill="none">
        {/* New Moon */}
        <circle cx="15" cy="15" r="7" stroke="#D2A84A" />
        {/* Waxing Crescent */}
        <path d="M 50 8 A 7 7 0 0 1 50 22 A 4 7 0 0 0 50 8 Z" fill="#6650B8" />
        <circle cx="50" cy="15" r="7" />
        {/* First Quarter */}
        <path d="M 85 8 A 7 7 0 0 1 85 22 Z" fill="#6650B8" />
        <circle cx="85" cy="15" r="7" />
        {/* Full Moon */}
        <circle cx="120" cy="15" r="7" fill="#D2A84A" stroke="#D2A84A" />
      </g>
    </svg>
  )
}
