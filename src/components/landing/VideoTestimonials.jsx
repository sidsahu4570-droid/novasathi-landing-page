import React, { useState, useRef, useCallback, useEffect } from 'react';

/**
 * VideoTestimonials — Premium Video Review Section
 *
 * HOW TO ADD REAL VIDEOS:
 * - Drop .mp4 files into /public/videos/
 * - Update the testimonials array below with correct paths & poster images
 */
const testimonials = [
  {
    id: 1,
    name: 'Rahul',
    category: 'Career & Astrology',
    rating: 5,
    quote: 'That conversation gave me the clarity I needed. I finally knew which direction to take.',
    video: '/videos/review-1.mp4',
    poster: '/videos/review-1-poster.jpg',
  },
  {
    id: 2,
    name: 'Tanvi',
    category: 'Love & Relationships',
    rating: 5,
    quote: 'I finally felt like someone truly understood what I was going through. It was deeply calming.',
    video: '/videos/review-2.mp4',
    poster: '/videos/review-2-poster.jpg',
  },
  {
    id: 3,
    name: 'Rohan',
    category: 'Tarot & Guidance',
    rating: 5,
    quote: 'The guidance helped me look at my situation from a completely different angle.',
    video: '/videos/review-3.mp4',
    poster: '/videos/review-3-poster.jpg',
  },
];

/* ── Individual Video Card ──────────────────────────────────────────────── */
function VideoCard({ item, activeId, onPlay }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const isActive = activeId === item.id;

  // Pause if another card became active
  useEffect(() => {
    if (!isActive && playing && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [isActive, playing]);

  const handlePlay = useCallback(() => {
    if (videoError) return;
    onPlay(item.id);
    const vid = videoRef.current;
    if (!vid) return;
    if (playing) {
      vid.pause();
      setPlaying(false);
    } else {
      vid.play().catch(() => setVideoError(true));
      setPlaying(true);
    }
  }, [videoError, onPlay, item.id, playing]);

  return (
    <div className="vt-card">
      {/* Video / Placeholder area */}
      <div className="vt-video-wrap" onClick={handlePlay}>
        {videoError ? (
          <div className="vt-placeholder" aria-label={`Video placeholder for ${item.name}`}>
            <div className="vt-placeholder-glow" />
            <div className="vt-placeholder-icon">🎥</div>
            <span className="vt-placeholder-label">Video coming soon</span>
          </div>
        ) : (
          <video
            ref={videoRef}
            className="vt-video"
            src={item.video}
            poster={item.poster}
            preload="metadata"
            playsInline
            onEnded={() => setPlaying(false)}
            onError={() => setVideoError(true)}
            aria-label={`${item.name}'s video testimonial about ${item.category}`}
          />
        )}

        {/* Play / Pause overlay */}
        {!videoError && (
          <button
            className={`vt-play-btn ${playing ? 'vt-playing' : ''}`}
            aria-label={playing ? 'Pause video' : 'Play video'}
            onClick={(e) => { e.stopPropagation(); handlePlay(); }}
          >
            <span className="vt-play-circle">
              {playing ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </span>
          </button>
        )}
      </div>

      {/* Info */}
      <div className="vt-info">
        <div className="vt-stars" aria-label={`${item.rating} out of 5 stars`}>
          {'★'.repeat(item.rating)}
        </div>
        <p className="vt-quote">"{item.quote}"</p>
        <div className="vt-author">
          <span className="vt-name">— {item.name}</span>
          <span className="vt-category">{item.category}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ───────────────────────────────────────────────────────── */
export default function VideoTestimonials({ onOpenModal }) {
  const [activeId, setActiveId] = useState(null);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const total = testimonials.length;

  const handlePlay = useCallback((id) => setActiveId(id), []);
  const goTo = useCallback((idx) => setCurrent(Math.max(0, Math.min(total - 1, idx))), [total]);

  // Touch swipe (mobile only)
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) goTo(current + 1);
    else if (dx > 40) goTo(current - 1);
    touchStartX.current = null;
  };

  return (
    <section className="section-vt" aria-labelledby="vt-heading" id="video-testimonials">
      <div className="content-container">

        {/* Heading */}
        <div className="vt-header">
          <h2 className="vt-heading" id="vt-heading">Real People. Real Experiences.</h2>
          <p className="vt-subheading">
            Sometimes, one conversation is all it takes to see things differently.
          </p>
        </div>

        {/* ── Desktop: Static 3-column grid ── */}
        <div className="vt-grid-desktop">
          {testimonials.map((item) => (
            <VideoCard key={item.id} item={item} activeId={activeId} onPlay={handlePlay} />
          ))}
        </div>

        {/* ── Mobile: 1-card carousel ── */}
        <div
          className="vt-mobile-carousel"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="vt-mobile-track"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonials.map((item) => (
              <div className="vt-mobile-slide" key={item.id}>
                <VideoCard item={item} activeId={activeId} onPlay={handlePlay} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="vt-mobile-nav">
          <button
            className="vt-arrow"
            onClick={() => goTo(current - 1)}
            disabled={current === 0}
            aria-label="Previous"
          >‹</button>
          <div className="vt-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`vt-dot ${i === current ? 'active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="vt-arrow"
            onClick={() => goTo(current + 1)}
            disabled={current === total - 1}
            aria-label="Next"
          >›</button>
        </div>

        {/* CTA */}
        <div className="vt-cta-wrap">
          <p className="vt-cta-prompt">Want your own clarity?</p>
          <button
            className="btn-primary btn-gold vt-cta-btn"
            onClick={() => onOpenModal('General')}
          >
            Start Your Free 5 Minutes →
          </button>
        </div>

      </div>
    </section>
  );
}
