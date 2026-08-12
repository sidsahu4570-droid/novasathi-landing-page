import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { selectServiceAndScroll } from '../utils/navigation'

const features = [
  {
    icon: '⭐',
    label: 'Vedic Astrology',
    serviceName: 'Vedic Astrology',
    title: 'Vedic Astrology',
    desc: 'Deep birth chart readings for career, relationships & timing.',
    benefit: 'Know your stars →',
  },
  {
    icon: '🃏',
    label: 'Tarot Reading',
    serviceName: 'Tarot Reading',
    title: 'Tarot Reading',
    desc: 'Uncover hidden patterns, present blocks, and future path.',
    benefit: 'Gain clarity →',
  },
  {
    icon: '🔢',
    label: 'Numerology',
    serviceName: 'Numerology',
    title: 'Numerology',
    desc: 'Decode destiny numbers for life decisions & strengths.',
    benefit: 'Decode numbers →',
  },
  {
    icon: '🏠',
    label: 'Vastu Shastra',
    serviceName: 'Vastu',
    title: 'Vastu Shastra',
    desc: 'Align your home & workspace for success, peace & harmony.',
    benefit: 'Align your space →',
  },
  {
    icon: '💙',
    label: 'Dil Ki Baat',
    serviceName: 'Dil Ki Baat',
    title: 'Dil Ki Baat',
    desc: 'Compassionate peer listeners offering 100% anonymous support.',
    benefit: 'Speak freely →',
  },
  {
    icon: '📱',
    label: '24/7 Access',
    serviceName: 'General Inquiry',
    title: '24/7 Expert Access',
    desc: 'Connect with verified practitioners in seconds from your phone.',
    benefit: 'Connect 24/7 →',
  },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      id="features"
      ref={ref}
      className="ns-section"
      style={{ position: 'relative', background: 'transparent' }}
    >
      <div id="pain" style={{ position: 'absolute', top: 0 }} />
      <div id="transformation" style={{ position: 'absolute', top: 0 }} />

      <div className="ns-container">

        {/* Section 02 — Problem + Solution + Services Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="ns-label" style={{ marginBottom: '6px', background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.25)', color: '#F5F3FF' }}>
            🔮 Services & Solution
          </div>
          <h2 className="section-headline" style={{ marginBottom: '6px', color: '#FFFFFF', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            From confusion to <span style={{ background: 'linear-gradient(135deg, #c084fc 0%, #fbbf24 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>complete clarity</span>
          </h2>

          {/* Problem → Solution 1-line bar */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(255, 255, 255, 0.92)', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '50px', fontSize: '12.5px', color: '#171329', maxWidth: '640px', flexWrap: 'wrap', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
            <span style={{ color: '#dc2626', fontWeight: 700 }}>Struggling alone?</span>
            <span>→</span>
            <span style={{ color: '#059669', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle2 size={13} /> NovaSathi brings 24/7 private expert guidance
            </span>
          </div>
        </motion.div>

        {/* 3-Column Compact Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="ns-card group"
              role="button"
              tabIndex={0}
              aria-label={`Learn more about ${f.label}`}
              onClick={() => selectServiceAndScroll(f.serviceName)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectServiceAndScroll(f.serviceName) } }}
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              style={{
                padding: '14px 12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{f.icon}</span>
                  <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.25 }}>{f.title}</h3>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '8px' }}>{f.desc}</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--purple-500)', fontWeight: 600 }}>
                <span>{f.benefit}</span>
                <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
