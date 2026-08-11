import { motion } from 'framer-motion'
import { Star, ArrowRight, ChevronDown, Shield, Clock, Lock, Users } from 'lucide-react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const trustItems = [
  { icon: <Clock size={14} />, text: '5-Min Free Consultation', target: '#pricing' },
  { icon: <Shield size={14} />, text: '100% Private & Secure', target: '#why-novasathi' },
  { icon: <Lock size={14} />, text: 'Phone Masking Protected', target: '#faq' },
  { icon: <Users size={14} />, text: 'Verified Expert Network', target: '#showcase' },
]

const floatVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
}

const StarField = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {[...Array(60)].map((_, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: Math.random() > 0.8 ? '2px' : '1px',
          height: Math.random() > 0.8 ? '2px' : '1px',
          background: 'white',
          borderRadius: '50%',
          opacity: Math.random() * 0.6 + 0.2,
          animation: `twinkle ${2 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 4}s`,
        }}
      />
    ))}
  </div>
)

const CosmicOrb = ({ size, color, top, left, delay, opacity = 0.12 }) => (
  <div style={{
    position: 'absolute',
    width: size, height: size,
    background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
    borderRadius: '50%',
    top, left,
    opacity,
    filter: 'blur(60px)',
    animation: `float ${6 + delay}s ease-in-out infinite`,
    animationDelay: `${delay}s`,
    pointerEvents: 'none',
  }} />
)

const ExpertCard = ({ icon, name, specialty, rating, sessions }) => (
  <div
    className="ns-card"
    role="button"
    tabIndex={0}
    onClick={() => selectServiceAndScroll(specialty)}
    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(specialty) }}
    style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px', cursor: 'pointer' }}
  >
    <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, rgba(172,75,255,0.25), rgba(249,156,0,0.2))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
      {icon}
    </div>
    <div>
      <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>{name}</div>
      <div style={{ fontSize: '12px', color: 'var(--purple-500)', marginBottom: '4px' }}>{specialty}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{ display: 'flex', gap: '2px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={10} fill={i < rating ? '#f99c00' : 'transparent'} color={i < rating ? '#f99c00' : 'rgba(255,255,255,0.3)'} />
          ))}
        </div>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{sessions} sessions</span>
      </div>
    </div>
    <div style={{ marginLeft: 'auto' }}>
      <div className="online-dot" />
    </div>
  </div>
)

export default function Hero() {
  return (
    <section
      id="home"
      className="bg-hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
        overflow: 'hidden',
      }}
    >
      <StarField />
      <CosmicOrb size="600px" color="rgba(172,75,255,0.3)" top="-10%" left="-10%" delay={0} opacity={0.08} />
      <CosmicOrb size="400px" color="rgba(249,156,0,0.3)" top="20%" left="70%" delay={2} opacity={0.06} />
      <CosmicOrb size="300px" color="rgba(172,75,255,0.5)" top="70%" left="60%" delay={1} opacity={0.07} />

      <div className="ns-container" style={{ paddingTop: '60px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="hero-grid">

          {/* Left — Copy */}
          <div>
            <motion.div custom={0} variants={floatVariants} initial="hidden" animate="visible">
              <button
                type="button"
                onClick={() => scrollToSection('reviews')}
                className="ns-label"
                style={{ marginBottom: '24px', cursor: 'pointer', background: 'var(--purple-subtle)', border: '1px solid var(--border-purple)' }}
              >
                <Star size={12} fill="var(--purple-500)" color="var(--purple-500)" />
                Trusted by thousands across India →
              </button>
            </motion.div>

            <motion.h1
              className="hero-headline"
              custom={1}
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              style={{ marginBottom: '24px', color: 'var(--text-primary)' }}
            >
              Get Clarity on Life's{' '}
              <span className="gradient-text">Biggest Questions</span>{' '}
              — From Experts Who Understand
            </motion.h1>

            <motion.p
              custom={2}
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              style={{ fontSize: '18px', lineHeight: 1.7, color: 'var(--text-secondary)', marginBottom: '36px', maxWidth: '520px' }}
            >
              Connect with verified astrologers, tarot readers, and emotional wellness counselors. 
              Get personalized guidance for career, relationships, and life — completely private, 
              available 24/7, and starting <strong style={{ color: 'var(--purple-500)' }}>100% free</strong>.
            </motion.p>

            <motion.div
              custom={3}
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}
            >
              <button
                type="button"
                onClick={() => selectServiceAndScroll('General Inquiry')}
                className="btn-primary"
                style={{ fontSize: '16px', padding: '16px 36px' }}
              >
                Start Free Consultation <ArrowRight size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('how-it-works')}
                className="btn-secondary"
                style={{ fontSize: '16px' }}
              >
                How It Works <ChevronDown size={16} />
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              custom={4}
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
              className="trust-grid"
            >
              {trustItems.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSection(item.target)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: 'var(--text-secondary)',
                    fontSize: '13px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 0',
                    textAlign: 'left',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <span style={{ color: 'var(--green-active)' }}>{item.icon}</span>
                  {item.text}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual */}
          <motion.div
            custom={2}
            variants={floatVariants}
            initial="hidden"
            animate="visible"
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}
            className="hero-visual"
          >
            {/* Main cosmic card */}
            <div className="animate-float" style={{ width: '100%', maxWidth: '380px' }}>
              <div className="ns-card-purple" style={{ padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden', backdropFilter: 'blur(20px)' }}>
                {/* Cosmic mandala */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => scrollToSection('showcase')}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('showcase') }}
                  style={{ position: 'relative', margin: '0 auto 24px', width: '160px', height: '160px', cursor: 'pointer' }}
                >
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(172,75,255,0.25), rgba(249,156,0,0.15))',
                    border: '2px solid var(--border-purple)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'spin-slow 20s linear infinite',
                  }}>
                    <div style={{
                      width: '110px', height: '110px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(249,156,0,0.2), rgba(172,75,255,0.2))',
                      border: '2px solid var(--border-amber)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '52px',
                    }}>
                      🔮
                    </div>
                  </div>
                </div>

                <div style={{ fontFamily: '"Cinzel", serif', fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Your Spiritual Companion
                </div>
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Ancient wisdom. Modern platform.
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { emoji: '⭐', label: 'Vedic Astro', service: 'Vedic Astrology' },
                    { emoji: '🃏', label: 'Tarot', service: 'Tarot Reading' },
                    { emoji: '🔢', label: 'Numerology', service: 'Numerology' },
                  ].map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => selectServiceAndScroll(s.service)}
                      style={{
                        padding: '12px 6px',
                        background: 'var(--purple-subtle)',
                        borderRadius: '10px',
                        border: '1px solid var(--border-purple)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purple-500)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-purple)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div style={{ fontSize: '20px', marginBottom: '4px' }}>{s.emoji}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>{s.label}</div>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => scrollToSection('showcase')}
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: 'rgba(0,187,127,0.08)',
                    border: '1px solid rgba(0,187,127,0.25)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,187,127,0.15)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,187,127,0.08)'}
                >
                  <div className="online-dot" />
                  <span style={{ fontSize: '13px', color: 'var(--green-active)', fontWeight: 600 }}>150+ Experts Available Now →</span>
                </button>
              </div>
            </div>

            {/* Floating expert mini-cards */}
            <motion.div
              style={{ position: 'absolute', left: '-120px', top: '80px' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="floating-card-hide"
            >
              <ExpertCard icon="🌙" name="Pandit Sharma" specialty="Vedic Astrology" rating={5} sessions="2.4k" />
            </motion.div>

            <motion.div
              style={{ position: 'absolute', right: '-110px', bottom: '60px' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="floating-card-hide"
            >
              <ExpertCard icon="💙" name="Priya Mehta" specialty="Dil Ki Baat" rating={5} sessions="1.8k" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            onClick={() => scrollToSection('pain')}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', fontSize: '12px' }}
          >
            <span>Scroll to explore</span>
            <ChevronDown size={20} />
          </button>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; text-align: center; }
          .hero-visual { display: none !important; }
          .trust-grid { justify-content: center; }
        }
        @media (max-width: 600px) {
          .floating-card-hide { display: none !important; }
        }
      `}</style>
    </section>
  )
}
