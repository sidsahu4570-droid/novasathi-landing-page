import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const compareData = [
  {
    before: 'Navigating career, relationship & life decisions alone',
    after: 'Personalized Vedic Astrology & Tarot guidance on your path',
    service: 'Vedic Astrology',
  },
  {
    before: 'Hiding your feelings because privacy feels impossible',
    after: '100% anonymous — phone masking protects your identity',
    service: 'General Inquiry',
  },
  {
    before: 'Unsure if an astrologer or counselor is qualified',
    after: 'Every expert is verified, rated, and reviewed by real users',
    service: 'General Inquiry',
  },
  {
    before: 'Carrying emotional weight with no safe place to speak',
    after: 'Speak your heart freely via "Dil Ki Baat" — judgment-free',
    service: 'Dil Ki Baat',
  },
]

export default function PainPoints() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      id="pain"
      ref={ref}
      className="ns-section bg-alt"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div id="transformation" style={{ position: 'absolute', top: 0 }} />
      <div className="ns-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label" style={{ marginBottom: '6px', display: 'inline-flex' }}>
            ⚡ The Shift
          </div>
          <h2 className="section-headline" style={{ marginBottom: '6px', color: 'var(--text-primary)' }}>
            From confusion to <span className="gradient-text">complete clarity</span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.45 }}>
            See how NovaSathi replaces uncertainty with genuine, private guidance.
          </p>
        </motion.div>

        {/* Side-by-side comparison table / card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
          {compareData.map((item, i) => (
            <motion.div
              key={i}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => selectServiceAndScroll(item.service)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(item.service) }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              style={{
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                cursor: 'pointer',
              }}
            >
              {/* Without NovaSathi */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <XCircle size={15} color="#ff2357" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.45, textDecoration: 'line-through' }}>
                  {item.before}
                </span>
              </div>

              {/* Divider line */}
              <div style={{ height: '1px', background: 'var(--border-purple)', opacity: 0.4 }} />

              {/* With NovaSathi */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <CheckCircle size={15} color="var(--green-active)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13.5px', color: 'var(--text-primary)', fontWeight: 600, lineHeight: 1.45 }}>
                  {item.after}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empathy bridge button */}
        <motion.div
          style={{ marginTop: '16px', textAlign: 'center' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            type="button"
            onClick={() => selectServiceAndScroll('General Inquiry')}
            style={{
              padding: '6px 16px',
              background: 'var(--purple-subtle)',
              border: '1px solid var(--border-purple)',
              borderRadius: '50px',
              color: 'var(--purple-500)',
              fontSize: '12.5px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            Start your free 5-minute shift now <ArrowRight size={13} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
