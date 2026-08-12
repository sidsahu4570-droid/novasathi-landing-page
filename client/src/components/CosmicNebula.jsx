import React from 'react'

export default function CosmicNebula() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Top Left — Soft Violet Nebula Cloud */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '-5%',
          width: '55vw',
          height: '55vw',
          maxHeight: '650px',
          maxWidth: '650px',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.28) 0%, rgba(139, 92, 246, 0.12) 45%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.85,
        }}
      />

      {/* Top Right — Soft Celestial Blue Nebula Cloud */}
      <div
        style={{
          position: 'absolute',
          top: '-5%',
          right: '-8%',
          width: '50vw',
          height: '50vw',
          maxHeight: '600px',
          maxWidth: '600px',
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, rgba(109, 74, 255, 0.14) 50%, transparent 70%)',
          filter: 'blur(110px)',
          opacity: 0.80,
        }}
      />

      {/* Center — Soft Lavender & Pink Atmospheric Glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '25%',
          width: '50vw',
          height: '40vw',
          maxHeight: '500px',
          maxWidth: '600px',
          background: 'radial-gradient(ellipse, rgba(232, 121, 249, 0.15) 0%, rgba(192, 132, 252, 0.08) 50%, transparent 70%)',
          filter: 'blur(120px)',
          opacity: 0.70,
        }}
      />

      {/* Lower Left — Deep Cosmic Purple Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-8%',
          width: '50vw',
          height: '50vw',
          maxHeight: '600px',
          maxWidth: '600px',
          background: 'radial-gradient(circle, rgba(109, 74, 255, 0.22) 0%, rgba(167, 139, 250, 0.12) 50%, transparent 70%)',
          filter: 'blur(105px)',
          opacity: 0.80,
        }}
      />

      {/* Lower Right — Soft Gold & Blue Cosmic Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-5%',
          right: '-5%',
          width: '55vw',
          height: '55vw',
          maxHeight: '650px',
          maxWidth: '650px',
          background: 'radial-gradient(circle, rgba(200, 155, 60, 0.18) 0%, rgba(139, 92, 246, 0.14) 45%, transparent 70%)',
          filter: 'blur(115px)',
          opacity: 0.75,
        }}
      />
    </div>
  )
}
