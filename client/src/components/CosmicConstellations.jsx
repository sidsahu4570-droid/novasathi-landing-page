import React from 'react'

export default function CosmicConstellations() {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.18,
        pointerEvents: 'none',
      }}
    >
      {/* Constellation 1 — Top Left Edge */}
      <g stroke="#6D4AFF" strokeWidth="0.8" fill="none">
        <polyline points="40,50 65,70 85,45 115,75 140,55" strokeDasharray="2 2" />
        <circle cx="40" cy="50" r="2.5" fill="#6D4AFF" />
        <circle cx="65" cy="70" r="2" fill="#C89B3C" />
        <circle cx="85" cy="45" r="2.5" fill="#6D4AFF" />
        <circle cx="115" cy="75" r="2" fill="#6D4AFF" />
        <circle cx="140" cy="55" r="2.5" fill="#C89B3C" />
      </g>

      {/* Constellation 2 — Top Right Edge */}
      <g stroke="#C89B3C" strokeWidth="0.8" fill="none" transform="translate(850, 40)">
        <polyline points="0,40 30,35 60,45 90,50 110,30 140,25 130,55 90,50" strokeDasharray="2 2" />
        <circle cx="0" cy="40" r="2" fill="#6D4AFF" />
        <circle cx="30" cy="35" r="2" fill="#C89B3C" />
        <circle cx="60" cy="45" r="2" fill="#6D4AFF" />
        <circle cx="90" cy="50" r="2.5" fill="#C89B3C" />
        <circle cx="110" cy="30" r="2" fill="#6D4AFF" />
        <circle cx="140" cy="25" r="2" fill="#C89B3C" />
        <circle cx="130" cy="55" r="2.5" fill="#6D4AFF" />
      </g>

      {/* Constellation 3 — Bottom Left Edge */}
      <g stroke="#6D4AFF" strokeWidth="0.8" fill="none" transform="translate(50, 480)">
        <line x1="20" y1="20" x2="80" y2="25" strokeDasharray="2 2" />
        <line x1="80" y1="25" x2="70" y2="85" strokeDasharray="2 2" />
        <line x1="70" y1="85" x2="10" y2="80" strokeDasharray="2 2" />
        <line x1="10" y1="80" x2="20" y2="20" strokeDasharray="2 2" />
        <line x1="30" y1="52" x2="60" y2="52" stroke="#C89B3C" strokeWidth="1" />
        <circle cx="30" cy="52" r="2" fill="#C89B3C" />
        <circle cx="45" cy="52" r="2" fill="#6D4AFF" />
        <circle cx="60" cy="52" r="2" fill="#C89B3C" />
        <circle cx="20" cy="20" r="2.5" fill="#6D4AFF" />
        <circle cx="80" cy="25" r="2.5" fill="#6D4AFF" />
        <circle cx="70" cy="85" r="2.5" fill="#C89B3C" />
        <circle cx="10" cy="80" r="2.5" fill="#6D4AFF" />
      </g>
    </svg>
  )
}
