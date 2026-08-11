import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { scrollToSection } from '../utils/navigation'

const pains = [
  {
    emoji: '😰',
    title: 'Life feels uncertain and overwhelming',
    desc: "You're at a crossroads — career, relationship, or a big decision — and you don't know who to turn to for honest, non-judgmental guidance.",
  },
  {
    emoji: '🤯',
    title: 'Too many conflicting opinions around you',
    desc: "Everyone gives advice, but nobody truly understands your situation. You need someone who listens deeply and guides from a place of wisdom.",
  },
  {
    emoji: '🔒',
    title: "You want to talk, but privacy feels impossible",
    desc: "Sharing your fears with family or friends feels risky. You need a safe, anonymous space where your identity is completely protected.",
  },
  {
    emoji: '⏰',
    title: 'Good astrologers are hard to find — and expensive',
    desc: "Finding a genuinely skilled, verified astrologer or counselor takes forever. And when you do, they charge a fortune just to get started.",
  },
  {
    emoji: '🌑',
    title: 'You carry the emotional weight alone',
    desc: "There's something weighing on your heart — something you can't say out loud. You wish someone would just listen without judging you.",
  },
]

export default function PainPoints() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="pain"
      ref={ref}
      className="ns-section bg-alt"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="ns-container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '64px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '20px', display: 'inline-flex' }}>
            🌑 The Struggle Is Real
          </div>
          <h2 className="section-headline" style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
            You shouldn't have to navigate{' '}
            <span className="gradient-text">life's hardest moments</span> alone
          </h2>
          <p style={{ fontSize: '17px', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto', lineHeight: 1.7 }}>
            If you've ever felt any of these, you're not alone — and NovaSathi exists to change exactly that.
          </p>
        </motion.div>

        {/* Pain Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {pains.map((pain, i) => (
            <motion.div
              key={i}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection('transformation')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('transformation') }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: '28px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                cursor: 'pointer',
                borderColor: 'rgba(255,35,87,0.18)',
              }}
            >
              <div style={{ fontSize: '32px', flexShrink: 0 }}>{pain.emoji}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#ff2357', fontSize: '14px', fontWeight: 700 }}>✗</span>
                  {pain.title}
                </div>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {pain.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empathy bridge */}
        <motion.div
          className="ns-card-purple"
          role="button"
          tabIndex={0}
          onClick={() => scrollToSection('transformation')}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('transformation') }}
          style={{ marginTop: '56px', textAlign: 'center', padding: '36px', borderRadius: '20px', cursor: 'pointer' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div style={{ fontSize: '28px', marginBottom: '12px' }}>✨</div>
          <p style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            What if you could get clarity — tonight, in minutes, completely privately?
          </p>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '20px' }}>
            That's exactly what NovaSathi makes possible. Here's how it transforms your experience.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--purple-500)', fontWeight: 600, fontSize: '14px' }}>
            See the Transformation <ArrowRight size={16} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
