import React from 'react'
import NebulaLayer from './NebulaLayer'
import OrbitLayer from './OrbitLayer'
import ZodiacWheel from './ZodiacWheel'
import ConstellationLayer from './ConstellationLayer'
import StarField from './StarField'
import PlanetLayer from './PlanetLayer'
import MoonPhaseLayer from './MoonPhaseLayer'

export default function CosmicBackground() {
  return (
    <div
      className="cosmic-background-root"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at 50% 30%, #F8F5FF 0%, #EEE8FF 60%, #DDD4FF 100%)',
      }}
    >
      {/* Layer 1: Soft Blurred Atmospheric Nebula Clouds */}
      <NebulaLayer />

      {/* Layer 2: Sweeping Elliptical Astronomical Orbit Arcs */}
      <OrbitLayer />

      {/* Layer 3: Master Line-Art Zodiac Diagram */}
      <ZodiacWheel />

      {/* Layer 4: Line-Art Constellation Patterns */}
      <ConstellationLayer />

      {/* Layer 5: 3-Level Star Distribution & Sparkle Anchors */}
      <StarField />

      {/* Layer 6: Abstract Celestial Spheres & Moon */}
      <PlanetLayer />

      {/* Layer 7: SVG Moon-Phase Sequence */}
      <MoonPhaseLayer />
    </div>
  )
}
