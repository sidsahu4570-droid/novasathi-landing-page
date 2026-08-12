import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

export default function FinalCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      id="final-cta"
      ref={ref}
      className="ns-section bg-glow-purple"
      style={{ position: 'relative', overflow: 'hidden', padding: '28px 16px' }}
    >
      <div className="ns-container" style={{ maxWidth: '760px', textAlign: 'center', position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label-amber" style={{ marginBottom: '8px' }}>
            🚀 Take the First Step
          </div>

          <h2 style={{ fontSize: 'clamp(1.45rem, 2.8vw, 2.0rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Your clarity is closer <span className="gradient-text">than you think</span>
          </h2>

          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45, maxWidth: '480px', margin: '0 auto 16px' }}>
            Stop carrying uncertainty alone. Connect with a verified expert in 2 minutes — completely private, starting 100% free.
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
            <button
              type="button"
              onClick={() => selectServiceAndScroll('General Inquiry')}
              className="btn-amber"
              style={{ fontSize: '14px', padding: '10px 28px' }}
            >
              Start Free Consultation ✨
            </button>
          </div>

          {/* Trust row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
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
                  background: 'none',
                  border: 'none',
                  fontSize: '11.5px',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--purple-500)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
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
