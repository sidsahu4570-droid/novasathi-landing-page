import React from 'react'

export default function ZodiacWheel() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '-80px',
        right: '-80px',
        width: '520px',
        height: '520px',
        opacity: 0.10,
        pointerEvents: 'none',
        animation: 'spin-slow 90s linear infinite',
      }}
    >
      <svg viewBox="0 0 200 200" width="100%" height="100%">
        <circle cx="100" cy="100" r="95" stroke="#6D4AFF" strokeWidth="0.8" fill="none" strokeDasharray="3 3" />
        <circle cx="100" cy="100" r="80" stroke="#C89B3C" strokeWidth="0.6" fill="none" />
        <circle cx="100" cy="100" r="60" stroke="#6D4AFF" strokeWidth="0.6" fill="none" strokeDasharray="2 2" />
        <text x="100" y="14" fill="#6D4AFF" fontSize="7.5" textAnchor="middle" fontWeight="bold">
          ♈  ♉  ♊  ♋  ♌  ♍  ♎  ♏  ♐  ♑  ♒  ♓
        </text>
      </svg>
    </div>
  )
}
