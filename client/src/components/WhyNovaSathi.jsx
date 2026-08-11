import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { scrollToSection } from '../utils/navigation'

const reasons = [
  {
    icon: '🔐',
    title: 'Absolute Privacy Guaranteed',
    desc: "Your real phone number is never shared with any expert — ever. NovaSathi uses end-to-end phone masking and anonymous IDs. What you share stays completely private.",
    highlight: 'No data shared. No exposure.',
    target: 'faq',
  },
  {
    icon: '✅',
    title: 'Every Expert Is Verified',
    desc: "We don't let just anyone on the platform. Every astrologer, tarot reader, and counselor on NovaSathi goes through a verification process. You only consult with genuine, experienced practitioners.",
    highlight: 'Quality experts. No imposters.',
    target: 'showcase',
  },
  {
    icon: '⚡',
    title: 'Try Before You Commit — Free',
    desc: "The first 5 minutes of every consultation are completely free. You experience the quality of guidance before you pay anything. There's zero risk to trying NovaSathi.",
    highlight: '5-minute free trial. Always.',
    target: 'pricing',
  },
  {
    icon: '🌙',
    title: 'Available Around the Clock',
    desc: "Our expert network covers all time zones and schedules. Whether it's 3am when you can't sleep or your lunch break, there's always an expert available to guide you.",
    highlight: '24/7 — even on holidays.',
    target: 'contact',
  },
  {
    icon: '💫',
    title: 'Two Unique Services in One Platform',
    desc: "NovaSathi uniquely combines Astrology & Occult Sciences with 'Dil Ki Baat' emotional wellness — two types of guidance you won't find together anywhere else.",
    highlight: 'Spiritual + Emotional support.',
    target: 'features',
  },
  {
    icon: '📱',
    title: 'Works as a PWA — No App Store Needed',
    desc: "Install NovaSathi directly from your browser in seconds — no app store, no downloads, no space consumed. It works like a native app on any device.",
    highlight: 'Instant access. Any device.',
    target: 'how-it-works',
  },
]

export default function WhyNovaSathi() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="why-novasathi"
      ref={ref}
      className="ns-section bg-glow-amber"
    >
      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '24px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label-amber" style={{ marginBottom: '10px' }}>
            ✨ Why Choose Us
          </div>
          <h2 className="section-headline" style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>
            Why thousands choose{' '}
            <span style={{ color: 'var(--amber-500)' }}>NovaSathi</span>{' '}
            over everything else
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.55 }}>
            These aren't just marketing claims. Here's what actually makes NovaSathi different.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection(r.target)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection(r.target) }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              style={{
                padding: '20px',
                cursor: 'pointer',
                borderColor: 'var(--border-amber)',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{r.icon}</div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>{r.title}</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>{r.desc}</p>
              </div>

              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 12px', background: 'var(--amber-subtle)', border: '1px solid var(--border-amber)', borderRadius: '8px' }}>
                <span style={{ fontSize: '11.5px', color: 'var(--amber-500)', fontWeight: 600 }}>{r.highlight}</span>
                <ArrowRight size={13} color="var(--amber-500)" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
