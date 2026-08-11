import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star } from 'lucide-react'
import { selectServiceAndScroll } from '../utils/navigation'

const initialExpertCards = [
  { emoji: '🌙', name: 'Pandit Raghavan', specialty: 'Vedic Astrology', exp: '12 years', sessions: '2.4k+', rating: 4.9, tag: 'Career & Marriage' },
  { emoji: '🃏', name: 'Nisha Kapoor', specialty: 'Tarot Reading', exp: '8 years', sessions: '1.9k+', rating: 4.8, tag: 'Relationships' },
  { emoji: '💙', name: 'Dr. Meera Joshi', specialty: 'Dil Ki Baat', exp: '6 years', sessions: '3.1k+', rating: 5.0, tag: 'Emotional Wellness' },
  { emoji: '🔢', name: 'Vivek Sharma', specialty: 'Numerology', exp: '10 years', sessions: '1.6k+', rating: 4.9, tag: 'Life Path & Business' },
]

export default function ProductShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredExperts = initialExpertCards.filter((card) => {
    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Astrology' && card.specialty.includes('Astrology')) ||
      (activeTab === 'Tarot' && card.specialty.includes('Tarot')) ||
      (activeTab === 'Dil Ki Baat' && card.specialty.includes('Dil Ki Baat'))

    const matchesSearch =
      card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.tag.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesSearch
  })

  return (
    <section
      id="showcase"
      ref={ref}
      className="ns-section bg-glow-purple"
      style={{ overflow: 'hidden' }}
    >
      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '24px' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="ns-label" style={{ marginBottom: '10px' }}>
            👁️ See the Experience
          </div>
          <h2 className="section-headline" style={{ marginBottom: '10px', color: 'var(--text-primary)' }}>
            Meet the experts{' '}
            <span className="gradient-text">waiting to help you</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.55 }}>
            Browse from 150+ verified practitioners. Read real reviews, check specialties, and connect instantly.
          </p>
        </motion.div>

        {/* Platform UI mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '24px' }}
        >
          {/* App frame */}
          <div className="ns-card-purple" style={{ padding: '20px', borderRadius: '16px' }}>

            {/* App header bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', padding: '12px 16px', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-default)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff2357' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f99c00' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00bb7f' }} />
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>novasathi.com</div>
              <div className="online-dot" />
            </div>

            {/* Search bar & Category filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search by category, concern, or expert name..."
                className="ns-input"
                style={{ flex: 1, minWidth: '220px', padding: '10px 16px', fontSize: '14px' }}
              />
              {['All', 'Astrology', 'Tarot', 'Dil Ki Baat'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  style={{
                    padding: '10px 16px',
                    background: activeTab === cat ? 'var(--purple-subtle)' : 'var(--bg-surface)',
                    border: `1px solid ${activeTab === cat ? 'var(--purple-500)' : 'var(--border-default)'}`,
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: activeTab === cat ? 700 : 500,
                    color: activeTab === cat ? 'var(--purple-500)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Expert cards */}
            <div className="expert-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {filteredExperts.length > 0 ? (
                filteredExperts.map((card, i) => (
                  <motion.div
                    key={card.name}
                    className="ns-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => selectServiceAndScroll(card.specialty)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(card.specialty) }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{ padding: '24px', textAlign: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>{card.emoji}</div>
                    <div style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-primary)', marginBottom: '4px' }}>{card.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--purple-500)', marginBottom: '12px' }}>{card.specialty}</div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '8px' }}>
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={12} fill={idx < Math.floor(card.rating) ? '#f99c00' : 'transparent'} color="#f99c00" />
                      ))}
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginLeft: '4px' }}>{card.rating}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '14px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{card.exp} exp.</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>·</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{card.sessions} sessions</div>
                    </div>

                    <div style={{ padding: '6px 12px', background: 'var(--purple-subtle)', border: '1px solid var(--border-purple)', borderRadius: '20px', fontSize: '11px', color: 'var(--purple-500)', display: 'inline-block', fontWeight: 600 }}>
                      {card.tag}
                    </div>

                    <div style={{ marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <div className="online-dot" />
                      <span style={{ fontSize: '12px', color: 'var(--green-active)', fontWeight: 600 }}>Available Now →</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No experts found matching "{searchQuery}". Clear search or select another category.
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Free trial CTA */}
        <motion.div
          className="ns-card-purple cta-banner-card"
          style={{ textAlign: 'center', padding: '36px 24px', borderRadius: '20px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🆓</div>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Your first 5 minutes with any expert are completely free
          </h3>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            No credit card required. No subscription. Just genuine guidance — risk-free.
          </p>
          <button
            type="button"
            onClick={() => selectServiceAndScroll('General Inquiry')}
            className="btn-primary"
            style={{ fontSize: '16px', padding: '15px 40px' }}
          >
            Browse Experts & Start Free →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
