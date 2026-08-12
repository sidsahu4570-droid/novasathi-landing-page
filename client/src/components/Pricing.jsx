import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Check, ShieldCheck, Lock, Clock, HeartHandshake } from 'lucide-react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const defaultPlans = [
  {
    name: 'Free Trial',
    tagline: 'Try before you decide',
    service: 'General Inquiry',
    pricePerMin: 0,
    description: 'Connect with any expert for your first consultation.',
    features: [
      '5 minutes free with any expert',
      'Access to all categories',
      'Phone masking protected',
      'No credit card required',
    ],
    isPopular: false,
    cta: 'Start Free Now',
  },
  {
    name: 'Per Session',
    tagline: 'Most popular choice',
    service: 'Vedic Astrology',
    pricePerMin: null,
    description: 'Unlock deeper guidance after your free trial.',
    features: [
      'Continue after free 5 minutes',
      'Pay only what you use',
      'Rates vary by expert level',
      'Rate & review after session',
    ],
    isPopular: true,
    cta: 'Explore Experts',
  },
  {
    name: 'Dil Ki Baat',
    tagline: 'Emotional wellness support',
    service: 'Dil Ki Baat',
    pricePerMin: null,
    description: 'Anonymous peer listening — spoken from the heart.',
    features: [
      '100% anonymous sessions',
      'System-generated ID protects you',
      'Trained compassionate listeners',
      'Available 24/7',
    ],
    isPopular: false,
    cta: 'Talk to Someone',
  },
]

const guarantees = [
  { icon: <Clock size={15} color="var(--purple-500)" />, title: '5-Minute Free Trial', desc: 'No risk, no charge to start' },
  { icon: <Lock size={15} color="var(--purple-500)" />, title: '100% Anonymous', desc: 'Phone masking protection' },
  { icon: <ShieldCheck size={15} color="var(--purple-500)" />, title: 'Verified Experts', desc: 'Background checked & rated' },
  { icon: <HeartHandshake size={15} color="var(--purple-500)" />, title: 'Zero Subscriptions', desc: 'Pay per session only' },
]

export default function Pricing() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section
      id="pricing"
      ref={ref}
      className="ns-section bg-alt"
      style={{ position: 'relative' }}
    >
      <div id="objections" style={{ position: 'absolute', top: 0 }} />
      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label" style={{ marginBottom: '6px' }}>
            💳 Transparent Pricing
          </div>
          <h2 className="section-headline" style={{ marginBottom: '6px', color: 'var(--text-primary)' }}>
            Simple, honest pricing — <span className="gradient-text">no subscriptions</span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.45 }}>
            Try 5 minutes free with any expert. Pay only for what you use after that.
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          {defaultPlans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className={plan.isPopular ? 'pricing-popular' : 'ns-card'}
              role="button"
              tabIndex={0}
              onClick={() => selectServiceAndScroll(plan.service || plan.name)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(plan.service || plan.name) }}
              style={{
                position: 'relative',
                padding: '16px 14px',
                borderRadius: '14px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
              }}
            >
              {plan.isPopular && (
                <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', padding: '2px 10px', background: 'linear-gradient(135deg, var(--purple-500), var(--purple-600))', borderRadius: '50px', fontSize: '9.5px', fontWeight: 700, color: 'white', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                  ✨ MOST POPULAR
                </div>
              )}

              <div>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: plan.isPopular ? 'var(--purple-500)' : 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>{plan.tagline}</div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{plan.name}</h3>
                  
                  <div style={{ marginBottom: '6px' }}>
                    {plan.pricePerMin === 0 ? (
                      <span style={{ fontSize: '26px', fontWeight: 900, color: 'var(--green-active)' }}>FREE</span>
                    ) : (
                      <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--purple-500)' }}>Pay-per-session (Varies by expert)</span>
                    )}
                  </div>

                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{plan.description}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                  {plan.features.map((f, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <div style={{ width: 15, height: 15, background: plan.isPopular ? 'var(--purple-subtle)' : 'rgba(0,187,127,0.12)', border: `1px solid ${plan.isPopular ? 'var(--border-purple)' : 'rgba(0,187,127,0.25)'}`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={10} color={plan.isPopular ? 'var(--purple-500)' : 'var(--green-active)'} strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  selectServiceAndScroll(plan.service || plan.name)
                }}
                className={plan.isPopular ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center', fontSize: '12.5px', padding: '8px 16px' }}
              >
                {plan.cta} →
              </button>
            </motion.div>
          ))}
        </div>

        {/* Guarantees / Risk Free Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
          {guarantees.map((g, idx) => (
            <div
              key={idx}
              className="ns-card"
              role="button"
              tabIndex={0}
              onClick={() => scrollToSection('faq')}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') scrollToSection('faq') }}
              style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <div style={{ flexShrink: 0 }}>{g.icon}</div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{g.title}</div>
                <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{g.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
