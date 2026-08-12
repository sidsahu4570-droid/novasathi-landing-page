import React from 'react'

export default function ConstellationLayer() {
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
      {/* Constellation 1 — Upper Left Edge (Cassiopeia shape) */}
      <g stroke="#6650B8" strokeWidth="0.8" fill="none">
        <polyline points="45,55 70,75 90,50 120,80 145,60" strokeDasharray="2 2" />
        <circle cx="45" cy="55" r="2.5" fill="#6650B8" />
        <circle cx="70" cy="75" r="2" fill="#D2A84A" />
        <circle cx="90" cy="50" r="2.5" fill="#6650B8" />
        <circle cx="120" cy="80" r="2" fill="#6650B8" />
        <circle cx="145" cy="60" r="2.5" fill="#D2A84A" />
      </g>

      {/* Constellation 2 — Upper Right Edge (Ursa Major shape) */}
      <g stroke="#D2A84A" strokeWidth="0.8" fill="none" transform="translate(850, 45)">
        <polyline points="0,40 30,35 60,45 90,50 110,30 140,25 130,55 90,50" strokeDasharray="2 2" />
        <circle cx="0" cy="40" r="2" fill="#6650B8" />
        <circle cx="30" cy="35" r="2" fill="#D2A84A" />
        <circle cx="60" cy="45" r="2" fill="#6650B8" />
        <circle cx="90" cy="50" r="2.5" fill="#D2A84A" />
        <circle cx="110" cy="30" r="2" fill="#6650B8" />
        <circle cx="140" cy="25" r="2" fill="#D2A84A" />
        <circle cx="130" cy="55" r="2.5" fill="#6650B8" />
      </g>

      {/* Constellation 3 — Lower Left Edge (Orion shape) */}
      <g stroke="#6650B8" strokeWidth="0.8" fill="none" transform="translate(60, 520)">
        <line x1="20" y1="20" x2="80" y2="25" strokeDasharray="2 2" />
        <line x1="80" y1="25" x2="70" y2="85" strokeDasharray="2 2" />
        <line x1="70" y1="85" x2="10" y2="80" strokeDasharray="2 2" />
        <line x1="10" y1="80" x2="20" y2="20" strokeDasharray="2 2" />
        <line x1="30" y1="52" x2="60" y2="52" stroke="#D2A84A" strokeWidth="1" />
        <circle cx="30" cy="52" r="2" fill="#D2A84A" />
        <circle cx="45" cy="52" r="2" fill="#6650B8" />
        <circle cx="60" cy="52" r="2" fill="#D2A84A" />
        <circle cx="20" cy="20" r="2.5" fill="#6650B8" />
        <circle cx="80" cy="25" r="2.5" fill="#6650B8" />
        <circle cx="70" cy="85" r="2.5" fill="#D2A84A" />
        <circle cx="10" cy="80" r="2.5" fill="#6650B8" />
      </g>

      {/* Constellation 4 — Lower Right Edge (Pegasus shape) */}
      <g stroke="#D2A84A" strokeWidth="0.8" fill="none" transform="translate(880, 550)">
        <polygon points="20,20 90,15 80,75 15,70" strokeDasharray="2 2" />
        <circle cx="20" cy="20" r="2.5" fill="#D2A84A" />
        <circle cx="90" cy="15" r="2" fill="#6650B8" />
        <circle cx="80" cy="75" r="2.5" fill="#D2A84A" />
        <circle cx="15" cy="70" r="2" fill="#6650B8" />
      </g>
    </svg>
  )
}
