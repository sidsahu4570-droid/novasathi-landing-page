import React from 'react';

/**
 * OrbitLayer — Partial Astronomical Orbits
 * Sweeping partial orbital arcs extending beyond viewport boundaries.
 * Represents Path, Journey, and Destiny.
 */
export default function OrbitLayer() {
  return (
    <div className="cosmic-layer" aria-hidden="true">
      <svg className="orbit-svg" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbit Arc 1: Large Sweeping Arc from Top-Right extending off-screen */}
        <g className="rotate-slow-cw">
          <ellipse
            cx="1100"
            cy="150"
            rx="680"
            ry="420"
            className="orbit-line"
            transform="rotate(-18 1100 150)"
          />
          {/* Orbital Node Points */}
          <circle cx="580" cy="310" r="2.5" fill="#D4A84F" opacity="0.6" filter="url(#orbit-glow)" />
          <circle cx="1620" cy="180" r="2.0" fill="#C8B8F4" opacity="0.5" />
        </g>

        {/* Orbit Arc 2: Large Counter-Arc from Lower-Left */}
        <g className="rotate-slow-ccw">
          <ellipse
            cx="320"
            cy="780"
            rx="750"
            ry="480"
            className="orbit-line-solid"
            transform="rotate(24 320 780)"
          />
          {/* Orbital Node Points */}
          <circle cx="850" cy="520" r="3.0" fill="#D4A84F" opacity="0.7" filter="url(#orbit-glow)" />
          <circle cx="150" cy="980" r="2.0" fill="#7189D8" opacity="0.5" />
        </g>

        {/* Orbit Arc 3: Concentric Gold Perimeter Arc surrounding Hero Center (Zone 3 & 4) */}
        <g>
          <path
            d="M 280,450 A 480,260 0 0,1 1160,450"
            className="orbit-line-gold"
            filter="url(#orbit-glow)"
          />
          <path
            d="M 340,450 A 420,220 0 0,0 1100,450"
            className="orbit-line"
            style={{ strokeDasharray: '6 12', opacity: 0.12 }}
          />
          
          {/* Small orbital markers */}
          <circle cx="720" cy="190" r="2.0" fill="#F8F4EA" opacity="0.6" />
          <circle cx="980" cy="330" r="2.2" fill="#D4A84F" opacity="0.8" filter="url(#orbit-glow)" />
        </g>
      </svg>
    </div>
  );
}
