import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { selectServiceAndScroll } from '../utils/navigation'

const features = [
  {
    icon: '⭐',
    color: 'rgba(172,75,255,0.15)',
    border: 'rgba(172,75,255,0.25)',
    label: 'Vedic Astrology',
    serviceName: 'Vedic Astrology',
    title: 'Know what the stars say about your path',
    desc: 'Deep, personalized Vedic astrology readings based on your birth chart for career & life.',
    benefit: 'Stop guessing. Start knowing.',
  },
  {
    icon: '🃏',
    color: 'rgba(249,156,0,0.12)',
    border: 'rgba(249,156,0,0.25)',
    label: 'Tarot Reading',
    serviceName: 'Tarot Reading',
    title: 'Uncover hidden forces shaping your life',
    desc: 'Gain insight into past patterns, present blocks, and future possibilities.',
    benefit: 'Gain deep clarity.',
  },
  {
    icon: '🔢',
    color: 'rgba(0,187,127,0.12)',
    border: 'rgba(0,187,127,0.25)',
    label: 'Numerology',
    serviceName: 'Numerology',
    title: 'Decode numbers written in your destiny',
    desc: 'Reveal your life path, strengths, and optimal timing for major decisions.',
    benefit: 'Understand yourself deeper.',
  },
  {
    icon: '🏠',
    color: 'rgba(48,128,255,0.12)',
    border: 'rgba(48,128,255,0.25)',
    label: 'Vastu Shastra',
    serviceName: 'Vastu',
    title: 'Align your space for success & peace',
    desc: 'Transform home or workplace into an energy-aligned environment for growth.',
    benefit: 'Create supporting space.',
  },
  {
    icon: '💙',
    color: 'rgba(255,35,87,0.12)',
    border: 'rgba(255,35,87,0.25)',
    label: 'Dil Ki Baat',
    serviceName: 'Dil Ki Baat',
    title: 'Talk freely — without judgment',
    desc: 'Compassionate peer listeners offering a safe, 100% anonymous space to speak your heart.',
    benefit: 'Feel heard & lighter.',
  },
  {
    icon: '📱',
    color: 'rgba(172,75,255,0.15)',
    border: 'rgba(172,75,255,0.25)',
    label: '24/7 Access',
    serviceName: 'General Inquiry',
    title: 'Guidance when you need it — 24/7',
    desc: 'Access verified experts around the clock directly from your phone in seconds.',
    benefit: 'Help is a tap away.',
  },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      id="features"
      ref={ref}
      className="ns-section bg-alt"
      style={{ position: 'relative' }}
    >
      <div id="benefits" style={{ position: 'absolute', top: 0 }} />
      <div className="ns-container">
        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label" style={{ marginBottom: '6px' }}>
            🔮 Core Guidance Services
          </div>
          <h2 className="section-headline" style={{ marginBottom: '6px', color: 'var(--text-primary)' }}>
            Everything you need for <span className="gradient-text">clarity & peace</span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.45 }}>
            Select any service to start your free 5-minute consultation directly.
          </p>
        </motion.div>

        {/* 3-Column Compact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="ns-card group"
              role="button"
              tabIndex={0}
              aria-label={`Learn more about ${f.label}`}
              onClick={() => selectServiceAndScroll(f.serviceName)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectServiceAndScroll(f.serviceName) } }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{
                padding: '16px 14px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <div style={{ width: 34, height: 34, background: f.color, border: `1px solid ${f.border}`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
                    {f.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--purple-500)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{f.label}</div>
                    <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.25 }}>{f.title}</h3>
                  </div>
                </div>

                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '10px' }}>{f.desc}</p>
              </div>

              <div
                className="action-pill"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  padding: '6px 10px',
                  background: 'var(--purple-subtle)',
                  border: '1px solid var(--border-purple)',
                  borderRadius: '8px',
                  color: 'var(--text-purple)',
                  fontSize: '11.5px',
                  fontWeight: 600,
                }}
              >
                <span>{f.benefit}</span>
                <ArrowRight size={13} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
