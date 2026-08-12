import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { scrollToSection } from '../utils/navigation'

const reasons = [
  {
    icon: '🔐',
    title: 'Absolute Privacy Guaranteed',
    desc: 'Phone masking & system IDs protect your real number & identity completely.',
    highlight: 'No data shared.',
    target: 'faq',
  },
  {
    icon: '✅',
    title: 'Every Expert Is Verified',
    desc: 'Practitioners undergo strict background verification and track record checks.',
    highlight: 'Verified experts.',
    target: 'showcase',
  },
  {
    icon: '⚡',
    title: 'Try Before You Commit — Free',
    desc: 'First 5 minutes of every consultation are completely free. Zero risk.',
    highlight: '5-min free trial.',
    target: 'pricing',
  },
  {
    icon: '🌙',
    title: 'Available 24/7 Around the Clock',
    desc: 'Expert network covers all time zones — day, night, or holidays.',
    highlight: '24/7 availability.',
    target: 'contact',
  },
  {
    icon: '💫',
    title: 'Spiritual + Emotional Support',
    desc: 'Unique combination of Astrology & Occult Sciences with "Dil Ki Baat" wellness.',
    highlight: '2-in-1 platform.',
    target: 'features',
  },
  {
    icon: '📱',
    title: 'PWA Instant Access',
    desc: 'Access directly from browser in seconds without downloading store apps.',
    highlight: 'No app store needed.',
    target: 'how-it-works',
  },
]

export default function WhyNovaSathi() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      id="why-novasathi"
      ref={ref}
      className="ns-section bg-glow-amber"
    >
      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label-amber" style={{ marginBottom: '6px' }}>
            ✨ Why Choose Us
          </div>
          <h2 className="section-headline" style={{ marginBottom: '6px', color: 'var(--text-primary)' }}>
            Why thousands choose <span style={{ color: 'var(--amber-500)' }}>NovaSathi</span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.45 }}>
            Here is what actually sets NovaSathi apart from traditional services.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection(r.target)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection(r.target) }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              style={{
                padding: '16px 14px',
                cursor: 'pointer',
                borderColor: 'var(--border-amber)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span style={{ fontSize: '22px' }}>{r.icon}</span>
                  <h3 style={{ fontSize: '14.5px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.25 }}>{r.title}</h3>
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '10px' }}>{r.desc}</p>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', padding: '5px 10px', background: 'var(--amber-subtle)', border: '1px solid var(--border-amber)', borderRadius: '6px' }}>
                <span style={{ fontSize: '11px', color: 'var(--amber-500)', fontWeight: 600 }}>{r.highlight}</span>
                <ArrowRight size={12} color="var(--amber-500)" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
