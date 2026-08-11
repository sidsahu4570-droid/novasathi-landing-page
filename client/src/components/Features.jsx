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
    desc: "Get deep, personalized Vedic astrology readings based on your birth chart — for career, relationships, health, and life decisions. Not generic daily horoscopes. Real, personalised guidance.",
    benefit: 'Stop guessing. Start knowing.',
  },
  {
    icon: '🃏',
    color: 'rgba(249,156,0,0.12)',
    border: 'rgba(249,156,0,0.25)',
    label: 'Tarot Reading',
    serviceName: 'Tarot Reading',
    title: 'Uncover the hidden forces shaping your life',
    desc: 'Connect with expert tarot readers who help you gain insight into past patterns, present blocks, and future possibilities — all through a deeply intuitive, personalised reading.',
    benefit: "Gain the insight you've been missing.",
  },
  {
    icon: '🔢',
    color: 'rgba(0,187,127,0.12)',
    border: 'rgba(0,187,127,0.25)',
    label: 'Numerology',
    serviceName: 'Numerology',
    title: "Decode the numbers written in your destiny",
    desc: "Your name and birth date hold powerful clues about who you are and what you're meant for. A numerology session reveals your life path, strengths, and the timing of your opportunities.",
    benefit: 'Understand yourself at a deeper level.',
  },
  {
    icon: '🏠',
    color: 'rgba(48,128,255,0.12)',
    border: 'rgba(48,128,255,0.25)',
    label: 'Vastu Shastra',
    serviceName: 'Vastu',
    title: 'Align your space to attract success and peace',
    desc: "Transform your home or workplace into an energy-aligned environment. Vastu consultations help you resolve persistent problems linked to space and direction.",
    benefit: 'Create a life-supporting environment.',
  },
  {
    icon: '💙',
    color: 'rgba(255,35,87,0.12)',
    border: 'rgba(255,35,87,0.25)',
    label: 'Dil Ki Baat',
    serviceName: 'Dil Ki Baat',
    title: 'Talk freely — without judgment, without fear',
    desc: "Sometimes you just need someone to listen. 'Dil Ki Baat' gives you access to compassionate peer listeners who offer a safe, completely anonymous space for your emotional wellbeing.",
    benefit: 'Feel heard. Feel lighter. Feel better.',
  },
  {
    icon: '📱',
    color: 'rgba(172,75,255,0.15)',
    border: 'rgba(172,75,255,0.25)',
    label: '24/7 Access',
    serviceName: 'General Inquiry',
    title: 'Guidance exactly when you need it — day or night',
    desc: "Life doesn't wait for business hours. NovaSathi gives you access to verified experts around the clock, from your phone — as a PWA you can install in seconds.",
    benefit: 'Help is always just a tap away.',
  },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="features"
      ref={ref}
      className="ns-section bg-alt"
    >
      <div className="ns-container">
        <motion.div
          style={{ textAlign: 'center', marginBottom: '24px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '10px' }}>
            🔮 Our Services
          </div>
          <h2 className="section-headline" style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>
            Everything you need,{' '}
            <span className="gradient-text">without the complexity</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.55 }}>
            Every service on NovaSathi is designed to give you one thing: the clarity and confidence to move forward with your life.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '16px' }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="ns-card group"
              role="button"
              tabIndex={0}
              aria-label={`Learn more about ${f.label} and get consultation`}
              onClick={() => selectServiceAndScroll(f.serviceName)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectServiceAndScroll(f.serviceName) } }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: '22px 20px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              <div>
                {/* Icon */}
                <div style={{ width: 44, height: 44, background: f.color, border: `1px solid ${f.border}`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '12px' }}>
                  {f.icon}
                </div>

                {/* Label */}
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--purple-500)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>{f.label}</div>

                {/* Title */}
                <h3 style={{ fontSize: '16.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>{f.title}</h3>

                {/* Desc */}
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>{f.desc}</p>
              </div>

              {/* Action Button Pill */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  selectServiceAndScroll(f.serviceName)
                }}
                className="action-pill"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  gap: '8px',
                  padding: '11px 16px',
                  background: 'var(--purple-subtle)',
                  border: '1px solid var(--border-purple)',
                  borderRadius: '10px',
                  color: 'var(--text-purple)',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.25s ease',
                }}
              >
                <span>{f.benefit}</span>
                <span className="arrow-icon" style={{ display: 'inline-flex', alignItems: 'center', transition: 'transform 0.25s ease' }}>
                  <ArrowRight size={15} />
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .ns-card:hover .action-pill {
          background: rgba(172, 75, 255, 0.16) !important;
          border-color: rgba(172, 75, 255, 0.45) !important;
          color: #ffffff !important;
        }
        .ns-card:hover .arrow-icon {
          transform: translateX(5px);
        }
      `}</style>
    </section>
  )
}
