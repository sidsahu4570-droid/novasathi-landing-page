import React from 'react'

export default function OrbitLayer() {
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
      {/* Huge Elliptical Orbit Arc Entering From Upper Right */}
      <ellipse
        cx="80%"
        cy="25%"
        rx="680"
        ry="300"
        stroke="rgba(102, 80, 184, 0.18)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="6 4"
        transform="rotate(-18, 700, 250)"
      />
      <ellipse
        cx="80%"
        cy="25%"
        rx="500"
        ry="210"
        stroke="rgba(210, 168, 74, 0.16)"
        strokeWidth="1"
        fill="none"
        strokeDasharray="4 4"
        transform="rotate(-18, 700, 250)"
      />

      {/* Sweeping Orbit Path Entering From Left Edge */}
      <path
        d="M -150,450 Q 350,600 1300,520"
        stroke="rgba(138, 115, 232, 0.15)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="5 5"
      />

      {/* Partial Elliptical Orbit Arc Entering Near Bottom */}
      <ellipse
        cx="30%"
        cy="85%"
        rx="600"
        ry="260"
        stroke="rgba(102, 80, 184, 0.16)"
        strokeWidth="1.2"
        fill="none"
        strokeDasharray="6 4"
        transform="rotate(12, 300, 800)"
      />
    </svg>
  )
}
