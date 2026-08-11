import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="final-cta"
      ref={ref}
      className="ns-section bg-glow-purple"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Cosmic background elements */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {[...Array(30)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '2px', height: '2px',
            background: 'white',
            borderRadius: '50%',
            opacity: Math.random() * 0.5 + 0.1,
            animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`,
          }} />
        ))}
      </div>

      <div className="ns-container" style={{ maxWidth: '800px', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div style={{ fontSize: '52px', marginBottom: '24px' }}>✨</div>

          <div className="ns-label-amber" style={{ marginBottom: '24px' }}>
            🚀 Take the First Step
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-0.02em' }}>
            Your clarity is closer{' '}
            <br />
            <span className="gradient-text">than you think</span>
          </h2>

          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '580px', margin: '0 auto 40px' }}>
            Stop carrying the weight of uncertainty alone. Thousands of people have found their direction, 
            peace of mind, and clarity through NovaSathi — in a single session, completely private, 
            starting free.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <button
              type="button"
              onClick={() => selectServiceAndScroll('General Inquiry')}
              className="btn-amber"
              style={{ fontSize: '17px', padding: '18px 44px' }}
            >
              Start Free Consultation ✨
            </button>
          </div>

          {/* Trust row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { label: '✓ 5 min free', target: 'pricing' },
              { label: '✓ 100% anonymous', target: 'why-novasathi' },
              { label: '✓ No subscription', target: 'pricing' },
              { label: '✓ Available 24/7', target: 'how-it-works' },
            ].map((item, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToSection(item.target)}
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
