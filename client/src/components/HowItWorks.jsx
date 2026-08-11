import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const steps = [
  {
    number: '01',
    emoji: '📲',
    title: 'Visit NovaSathi & Browse Experts',
    desc: "Open NovaSathi on any device. Browse verified experts by category — Vedic astrology, tarot, numerology, Vastu, or emotional wellness. Read their profiles, ratings, and specialties.",
    tip: 'No registration required to browse.',
    target: 'showcase',
  },
  {
    number: '02',
    emoji: '💬',
    title: 'Start Your Free 5-Minute Consultation',
    desc: "Pick the expert who feels right for you and start chatting — completely free for the first 5 minutes. No credit card, no commitment. Just a genuine conversation to see if they're the right fit.",
    tip: 'Your phone number is never shared.',
    target: 'pricing',
  },
  {
    number: '03',
    emoji: '🔓',
    title: 'Unlock Deeper Guidance',
    desc: "Loved the conversation? Unlock the full session with a simple payment to continue. Pay only for what you use — per session, not a subscription. Cancel anytime.",
    tip: 'Pay per session. No subscriptions.',
    target: 'pricing',
  },
  {
    number: '04',
    emoji: '🌟',
    title: 'Get Clarity & Move Forward',
    desc: "Walk away with real answers, a clear perspective, and the confidence to take your next step. Every session is designed to leave you feeling lighter, clearer, and more in control of your direction.",
    tip: 'Real guidance. Real results.',
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
          style={{ textAlign: 'center', marginBottom: '72px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '20px' }}>
            🗺️ Simple Process
          </div>
          <h2 className="section-headline" style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
            Getting started takes{' '}
            <span className="gradient-text">less than 2 minutes</span>
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            No complicated setup. No confusing process. Just four simple steps from question to clarity.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0', maxWidth: '880px', margin: '0 auto' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '0', position: 'relative' }}>

              {/* Left — Step number + connector */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '24px', flexShrink: 0 }}>
                <motion.button
                  type="button"
                  onClick={() => scrollToSection(step.target)}
                  aria-label={`Step ${step.number}: ${step.title}`}
                  className="step-number"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  style={{ cursor: 'pointer' }}
                >
                  {step.number}
                </motion.button>
                {i < steps.length - 1 && (
                  <div style={{ width: '2px', flex: 1, minHeight: '40px', background: 'linear-gradient(180deg, var(--purple-500), var(--purple-700))', opacity: 0.3, margin: '8px 0' }} />
                )}
              </div>

              {/* Right — Content */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.1, duration: 0.5 }}
                style={{ flex: 1, paddingBottom: i < steps.length - 1 ? '36px' : '0' }}
              >
                <div
                  className="ns-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => scrollToSection(step.target)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection(step.target) }}
                  style={{ padding: '28px 32px', display: 'flex', gap: '20px', alignItems: 'flex-start', cursor: 'pointer' }}
                >
                  <div style={{ fontSize: '36px', flexShrink: 0 }}>{step.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>{step.title}</h3>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '14px' }}>{step.desc}</p>
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); scrollToSection('faq') }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: 'rgba(0,187,127,0.08)',
                        border: '1px solid rgba(0,187,127,0.2)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ color: 'var(--green-active)', fontSize: '12px' }}>✓</span>
                      <span style={{ fontSize: '12px', color: 'var(--green-active)', fontWeight: 600 }}>{step.tip} →</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          style={{ textAlign: 'center', marginTop: '56px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
        >
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Ready to get started? Your first 5 minutes are free.
          </p>
          <button
            type="button"
            onClick={() => selectServiceAndScroll('General Inquiry')}
            className="btn-primary"
            style={{ fontSize: '16px', padding: '16px 40px' }}
          >
            Start Now — It's Free <ArrowRight size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
