import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const before = [
  { text: 'Confused about major life decisions' },
  { text: 'Seeking answers but finding only generic advice' },
  { text: 'Hiding your feelings because privacy feels impossible' },
  { text: 'Spending hours researching, getting nowhere' },
  { text: 'Unsure if an astrologer is actually qualified' },
  { text: 'Feeling emotionally alone with no safe space to speak' },
]

const after = [
  { text: 'Gain clarity on career, relationships, and your path ahead', service: 'Vedic Astrology' },
  { text: 'Personalised guidance from a verified expert who understands you', service: 'General Inquiry' },
  { text: '100% anonymous — your identity, number, and data stay private', service: 'General Inquiry' },
  { text: 'Get answers in minutes, 24/7 from your phone', service: 'General Inquiry' },
  { text: 'Every expert on NovaSathi is verified and rated', service: 'General Inquiry' },
  { text: 'Speak your heart freely via "Dil Ki Baat" — judgment-free', service: 'Dil Ki Baat' },
]

export default function Transformation() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="transformation"
      ref={ref}
      className="ns-section bg-base"
      style={{ position: 'relative' }}
    >
      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '20px' }}>
            🌅 The Transformation
          </div>
          <h2 className="section-headline" style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
            Imagine what life feels like{' '}
            <span className="gradient-text">after NovaSathi</span>
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.7 }}>
            The shift from confusion to clarity is closer than you think.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'start' }} className="transform-grid">

          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px', padding: '14px 20px', background: 'rgba(255,35,87,0.06)', border: '1px solid rgba(255,35,87,0.18)', borderRadius: '12px' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>😔</div>
              <div style={{ fontWeight: 700, fontSize: '18px', color: '#ff2357', letterSpacing: '-0.01em' }}>BEFORE</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Without NovaSathi</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {before.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'rgba(255,35,87,0.04)', border: '1px solid rgba(255,35,87,0.10)', borderRadius: '12px' }}
                >
                  <span style={{ color: '#ff2357', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>✗</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Arrow Button */}
          <motion.div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', gap: '8px' }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="transform-arrow"
          >
            <button
              type="button"
              onClick={() => scrollToSection('features')}
              aria-label="Explore NovaSathi services"
              style={{
                width: 56,
                height: 56,
                background: 'linear-gradient(135deg, var(--purple-500), var(--amber-500))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                boxShadow: '0 0 30px var(--purple-glow)',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.25s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
            >
              <ArrowRight size={24} color="white" />
            </button>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '60px' }}>with NovaSathi</span>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px', padding: '14px 20px', background: 'var(--purple-subtle)', border: '1px solid var(--border-purple)', borderRadius: '12px' }}>
              <div style={{ fontSize: '22px', marginBottom: '4px' }}>✨</div>
              <div style={{ fontWeight: 700, fontSize: '18px', color: 'var(--purple-500)', letterSpacing: '-0.01em' }}>AFTER</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>With NovaSathi</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {after.map((item, i) => (
                <motion.div
                  key={i}
                  className="ns-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => selectServiceAndScroll(item.service)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(item.service) }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', cursor: 'pointer' }}
                >
                  <span style={{ color: 'var(--purple-500)', fontWeight: 700, fontSize: '16px', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.5, flex: 1 }}>{item.text}</span>
                  <ArrowRight size={14} color="var(--purple-500)" style={{ flexShrink: 0 }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .transform-grid { grid-template-columns: 1fr !important; }
          .transform-arrow { display: none !important; }
        }
      `}</style>
    </section>
  )
}
