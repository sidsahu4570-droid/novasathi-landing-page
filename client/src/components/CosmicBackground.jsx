import React from 'react'
import CosmicNebula from './CosmicNebula'
import CosmicStars from './CosmicStars'
import CosmicConstellations from './CosmicConstellations'
import ZodiacWheel from './ZodiacWheel'
import CosmicPlanets from './CosmicPlanets'

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
        background: '#FAF8FF',
      }}
    >
      {/* 1. Soft Blurred Radial Nebula Clouds */}
      <CosmicNebula />

      {/* 2. Procedural SVG Twinkling Star Field */}
      <CosmicStars />

      {/* 3. Subtle Line-Art Constellations */}
      <CosmicConstellations />

      {/* 4. Rotating Outer-Edge Zodiac Wheel */}
      <ZodiacWheel />

      {/* 5. Abstract Edge Celestial Planets & Moon */}
      <CosmicPlanets />
    </div>
  )
}
