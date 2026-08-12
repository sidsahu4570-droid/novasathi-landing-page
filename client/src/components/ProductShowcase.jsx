import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Star } from 'lucide-react'
import { selectServiceAndScroll } from '../utils/navigation'

const experts = [
  {
    name: 'Acharya Ankit Sharma',
    specialty: 'Vedic Astrology',
    exp: '12+ yrs',
    rating: 4.9,
    sessions: '1,420+',
    emoji: '🧙‍♂️',
    tag: 'Career & Relationship Specialist',
    category: 'Astrology',
  },
  {
    name: 'Meera Kapoor',
    specialty: 'Tarot Reading',
    exp: '8+ yrs',
    rating: 4.8,
    sessions: '980+',
    emoji: '🔮',
    tag: 'Intuitive Life Path Reader',
    category: 'Tarot',
  },
  {
    name: 'Counselor Priya Nair',
    specialty: 'Dil Ki Baat Listener',
    exp: '6+ yrs',
    rating: 5.0,
    sessions: '2,100+',
    emoji: '💙',
    tag: 'Compassionate Listener',
    category: 'Dil Ki Baat',
  },
  {
    name: 'Pt. Ramesh Shastri',
    specialty: 'Numerology & Vastu',
    exp: '15+ yrs',
    rating: 4.9,
    sessions: '1,850+',
    emoji: '📜',
    tag: 'Vastu & Destiny Specialist',
    category: 'Astrology',
  },
]

export default function ProductShowcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [activeTab, setActiveTab] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredExperts = experts.filter((e) => {
    const matchesTab = activeTab === 'All' || e.category === activeTab
    const matchesSearch =
      searchQuery === '' ||
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  return (
    <section
      id="showcase"
      ref={ref}
      className="ns-section bg-glow-purple"
    >
      <div className="ns-container">

        <motion.div
          style={{ textAlign: 'center', marginBottom: '16px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="ns-label" style={{ marginBottom: '6px' }}>
            👁️ Verified Practitioner Directory
          </div>
          <h2 className="section-headline" style={{ marginBottom: '6px', color: 'var(--text-primary)' }}>
            Meet the experts <span className="gradient-text">waiting to guide you</span>
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '460px', margin: '0 auto', lineHeight: 1.45 }}>
            Browse verified practitioners, check ratings, and connect for your free 5-min consultation.
          </p>
        </motion.div>

        {/* Platform UI mockup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ marginBottom: '16px' }}
        >
          <div className="ns-card-purple" style={{ padding: '16px 14px', borderRadius: '14px' }}>

            {/* App header bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', padding: '8px 12px', background: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--border-default)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff2357' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f99c00' }} />
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00bb7f' }} />
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>novasathi.com</div>
              <div className="online-dot" />
            </div>

            {/* Search bar & Category filters */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 Search by category or expert..."
                className="ns-input"
                style={{ flex: 1, minWidth: '180px', padding: '8px 12px', fontSize: '13px' }}
              />
              {['All', 'Astrology', 'Tarot', 'Dil Ki Baat'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveTab(cat)}
                  style={{
                    padding: '8px 12px',
                    background: activeTab === cat ? 'var(--purple-subtle)' : 'var(--bg-surface)',
                    border: `1px solid ${activeTab === cat ? 'var(--purple-500)' : 'var(--border-default)'}`,
                    borderRadius: '8px',
                    fontSize: '12px',
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
            <div className="expert-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '10px' }}>
              {filteredExperts.length > 0 ? (
                filteredExperts.map((card, i) => (
                  <motion.div
                    key={card.name}
                    className="ns-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => selectServiceAndScroll(card.specialty)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') selectServiceAndScroll(card.specialty) }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    style={{ padding: '14px 12px', textAlign: 'center', cursor: 'pointer' }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '6px' }}>{card.emoji}</div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '2px' }}>{card.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--purple-500)', marginBottom: '6px' }}>{card.specialty}</div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2px', marginBottom: '6px' }}>
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={11} fill={idx < Math.floor(card.rating) ? '#f99c00' : 'transparent'} color="#f99c00" />
                      ))}
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '4px' }}>{card.rating}</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{card.exp} exp.</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>·</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{card.sessions} sessions</div>
                    </div>

                    <div style={{ padding: '4px 8px', background: 'var(--purple-subtle)', border: '1px solid var(--border-purple)', borderRadius: '14px', fontSize: '10px', color: 'var(--purple-500)', display: 'inline-block', fontWeight: 600 }}>
                      {card.tag}
                    </div>

                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <div className="online-dot" />
                      <span style={{ fontSize: '11.5px', color: 'var(--green-active)', fontWeight: 600 }}>Available Now →</span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div style={{ gridColumn: '1 / -1', padding: '24px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '13px' }}>
                  No experts found matching "{searchQuery}". Clear search or select another category.
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Free trial banner */}
        <motion.div
          className="ns-card-purple cta-banner-card"
          style={{ textAlign: 'center', padding: '18px 16px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div style={{ textAlign: 'left', flex: 1, minWidth: '220px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              🆓 First 5 minutes free with any expert
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>
              No credit card required. No subscription. Risk-free.
            </p>
          </div>
          <button
            type="button"
            onClick={() => selectServiceAndScroll('General Inquiry')}
            className="btn-primary"
            style={{ fontSize: '13px', padding: '9px 20px' }}
          >
            Browse Experts & Start Free →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
