import React from 'react'

export default function NebulaLayer() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Top Left — Soft Violet Atmospheric Cloud */}
      <div
        style={{
          position: 'absolute',
          top: '-12%',
          left: '-8%',
          width: '60vw',
          height: '60vw',
          maxWidth: '700px',
          maxHeight: '700px',
          background: 'radial-gradient(circle, rgba(184, 166, 245, 0.32) 0%, rgba(138, 115, 232, 0.16) 45%, transparent 72%)',
          filter: 'blur(110px)',
        }}
      />

      {/* Top Right — Soft Blue/Violet Cosmic Cloud */}
      <div
        style={{
          position: 'absolute',
          top: '-8%',
          right: '-10%',
          width: '55vw',
          height: '55vw',
          maxWidth: '650px',
          maxHeight: '650px',
          background: 'radial-gradient(circle, rgba(102, 80, 184, 0.22) 0%, rgba(147, 128, 235, 0.12) 50%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Center — Soft Lavender/Pink Atmospheric Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '60vw',
          height: '50vw',
          maxWidth: '700px',
          maxHeight: '600px',
          background: 'radial-gradient(ellipse, rgba(238, 232, 255, 0.38) 0%, rgba(221, 212, 255, 0.15) 55%, transparent 75%)',
          filter: 'blur(130px)',
        }}
      />

      {/* Lower Left — Deep Purple Cosmic Cloud */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-10%',
          width: '55vw',
          height: '55vw',
          maxWidth: '650px',
          maxHeight: '650px',
          background: 'radial-gradient(circle, rgba(102, 80, 184, 0.24) 0%, rgba(184, 166, 245, 0.14) 50%, transparent 70%)',
          filter: 'blur(115px)',
        }}
      />

      {/* Lower Right — Soft Gold & Lavender Atmosphere */}
      <div
        style={{
          position: 'absolute',
          bottom: '-8%',
          right: '-8%',
          width: '60vw',
          height: '60vw',
          maxWidth: '700px',
          maxHeight: '700px',
          background: 'radial-gradient(circle, rgba(210, 168, 74, 0.18) 0%, rgba(138, 115, 232, 0.15) 50%, transparent 72%)',
          filter: 'blur(120px)',
        }}
      />
    </div>
  )
}
