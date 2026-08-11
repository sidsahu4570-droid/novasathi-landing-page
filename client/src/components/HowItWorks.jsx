import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const steps = [
  {
    number: '01',
    emoji: '📲',
    title: 'Browse Experts',
    desc: 'Browse verified astrologers, tarot readers & counselors on any device.',
    tip: 'No registration barrier.',
    target: 'showcase',
  },
  {
    number: '02',
    emoji: '💬',
    title: 'Free 5-Min Trial',
    desc: 'Chat or call for 5 minutes free — 100% private, no credit card required.',
    tip: 'Phone masking protected.',
    target: 'pricing',
  },
  {
    number: '03',
    emoji: '🔓',
    title: 'Unlock Guidance',
    desc: 'Loved the session? Pay only for what you use — no subscriptions.',
    tip: 'Pay per session.',
    target: 'pricing',
  },
  {
    number: '04',
    emoji: '🌟',
    title: 'Get Results',
    desc: 'Walk away with real answers, deep perspective, and peace of mind.',
    tip: 'Real clarity.',
    target: 'contact',
  },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="ns-section bg-alt"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="ns-container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          style={{ textAlign: 'center', marginBottom: '28px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '10px' }}>
            🗺️ Simple Process
          </div>
          <h2 className="section-headline" style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>
            Getting started takes{' '}
            <span className="gradient-text">less than 2 minutes</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.55 }}>
            No complicated setup. Just four simple steps from question to clarity.
          </p>
        </motion.div>

        {/* 4-Step Horizontal Desktop Grid / Compact Mobile Stack */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }} className="how-it-works-grid">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection(step.target)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection(step.target) }}
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{
                padding: '20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                position: 'relative',
              }}
            >
              <div>
                {/* Step header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: '50%',
                    background: 'var(--purple-subtle)',
                    border: '1.5px solid var(--border-purple)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: 800, color: 'var(--purple-500)',
                  }}>
                    {step.number}
                  </div>
                  <div style={{ fontSize: '24px' }}>{step.emoji}</div>
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{step.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>{step.desc}</p>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 8px', background: 'rgba(0,187,127,0.08)', border: '1px solid rgba(0,187,127,0.2)', borderRadius: '6px' }}>
                <span style={{ color: 'var(--green-active)', fontSize: '11px' }}>✓</span>
                <span style={{ fontSize: '11px', color: 'var(--green-active)', fontWeight: 600 }}>{step.tip}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Compact CTA */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '28px' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <button
            type="button"
            onClick={() => selectServiceAndScroll('General Inquiry')}
            className="btn-primary"
            style={{ fontSize: '14.5px', padding: '12px 30px' }}
          >
            Start Free Consultation <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
