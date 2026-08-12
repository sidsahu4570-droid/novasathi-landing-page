import React from 'react'
import CosmicNebula from './CosmicNebula'
import CosmicOrbits from './CosmicOrbits'
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
      {/* 1. Layer 1: Soft Procedural Nebula Clouds */}
      <CosmicNebula />

      {/* 2. Layer 2: Celestial Guidance Orbits Flow */}
      <CosmicOrbits />

      {/* 3. Layer 3: 3-Level Star Hierarchy & Moon Phases */}
      <CosmicStars />

      {/* 4. Layer 4: Subtle Line-Art Constellations */}
      <CosmicConstellations />

      {/* 5. Layer 5: Single Master Zodiac Wheel Diagram */}
      <ZodiacWheel />

      {/* 6. Layer 6: Abstract Intentional Planets & Moon */}
      <CosmicPlanets />
    </div>
  )
}
