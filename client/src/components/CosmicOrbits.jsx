import React from 'react'

export default function CosmicOrbits() {
  return (
    <svg
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    >
      {/* Hero Outer Celestial Orbit Arc */}
      <ellipse
        cx="75%"
        cy="22%"
        rx="520"
        ry="240"
        stroke="rgba(109, 74, 255, 0.18)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="6 4"
        transform="rotate(-15, 600, 200)"
      />
      <ellipse
        cx="75%"
        cy="22%"
        rx="380"
        ry="170"
        stroke="rgba(200, 155, 60, 0.16)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="4 4"
        transform="rotate(-15, 600, 200)"
      />

      {/* Services Section Transition Orbit Flow */}
      <path
        d="M -100,500 Q 400,620 1200,540"
        stroke="rgba(109, 74, 255, 0.14)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="5 5"
      />

      {/* How It Works & Conversion Guidance Path */}
      <path
        d="M 1200,1050 Q 500,1200 -200,1100"
        stroke="rgba(200, 155, 60, 0.15)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="6 4"
      />

      {/* Final CTA Celestial Circle Arc */}
      <circle
        cx="50%"
        cy="92%"
        r="320"
        stroke="rgba(109, 74, 255, 0.15)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="4 4"
      />
    </svg>
  )
}
