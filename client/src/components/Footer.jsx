import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { selectServiceAndScroll, scrollToSection } from '../utils/navigation'

const essentialLinks = [
  { label: 'Vedic Astrology', service: 'Vedic Astrology' },
  { label: 'Tarot Reading', service: 'Tarot Reading' },
  { label: 'Dil Ki Baat', service: 'Dil Ki Baat' },
  { label: 'Contact Us', href: '#contact' },
  { label: 'Privacy Policy', href: 'https://novasathi.com/privacy' },
  { label: 'Terms & Conditions', href: 'https://novasathi.com/terms' },
]

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const handleLinkClick = (e, link) => {
    if (link.service) {
      e.preventDefault()
      selectServiceAndScroll(link.service)
    } else if (link.href && link.href.startsWith('#')) {
      e.preventDefault()
      scrollToSection(link.href)
    }
  }

  return (
    <footer
      ref={ref}
      style={{
        background: 'rgba(14, 9, 29, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(124, 58, 237, 0.25)',
        padding: '24px 16px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="ns-container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Brand & Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}
            >
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--purple-500)',
                boxShadow: '0 0 12px var(--purple-glow)',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                background: '#06070f',
                flexShrink: 0,
              }}>
                <img
                  src="/logo.jpg"
                  alt="Nova Sathi"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </a>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Connecting you with verified spiritual & wellness experts 24/7.
            </span>
          </div>

          {/* Important Links Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {essentialLinks.map(link => (
              <a
                key={link.label}
                href={link.href || '#contact'}
                onClick={(e) => handleLinkClick(e, link)}
                target={link.href && link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href && link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{ fontSize: '12.5px', color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--purple-500)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '11.5px', color: 'var(--text-muted)' }}>
          <span>© {new Date().getFullYear()} NovaSathi. All rights reserved.</span>
          <a
            href="https://novasathi.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--purple-500)', textDecoration: 'none', fontWeight: 600 }}
          >
            novasathi.com ↗
          </a>
        </div>
      </div>
    </footer>
  )
}
