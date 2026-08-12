import React, { useState, useRef, useCallback, useEffect } from 'react';

/**
 * VideoTestimonials — Premium Horizontal Video Review Carousel
 *
 * HOW TO ADD REAL VIDEOS:
 * - Drop .mp4 files into /public/videos/
 * - Update the testimonials array below with correct paths
 * - Optionally add poster images to /public/videos/ and update the poster field
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
function VideoCard({ item, activeId, onPlay, isMobile }) {
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

  const handleVideoEnd = () => setPlaying(false);
  const handleVideoError = () => setVideoError(true);

  return (
    <div className="vt-card">
      {/* Video area */}
      <div className="vt-video-wrap" onClick={handlePlay}>
        {videoError ? (
          /* Elegant placeholder when video file not found */
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
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            aria-label={`${item.name}'s video testimonial about ${item.category}`}
          />
        )}

        {/* Play / Pause overlay button */}
        {!videoError && (
          <button
            className={`vt-play-btn ${playing ? 'vt-playing' : ''}`}
            aria-label={playing ? 'Pause video' : 'Play video'}
            onClick={(e) => { e.stopPropagation(); handlePlay(); }}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        )}
      </div>

      {/* Text info */}
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
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const touchStartX = useRef(null);
  const total = testimonials.length;

  const handlePlay = useCallback((id) => setActiveId(id), []);

  // Calculate how far to shift: on mobile 1-up (full card width), on desktop shift by 1/3
  const getTranslate = useCallback(() => {
    if (!trackRef.current) return 0;
    const track = trackRef.current;
    const card = track.children[0];
    if (!card) return 0;
    const gap = parseInt(getComputedStyle(track).gap || '20', 10) || 0;
    return current * (card.offsetWidth + gap);
  }, [current]);

  const [translatePx, setTranslatePx] = useState(0);

  useEffect(() => {
    const update = () => setTranslatePx(getTranslate());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [current, getTranslate]);

  const goTo = useCallback((idx) => {
    const bounded = Math.max(0, Math.min(total - 1, idx));
    setCurrent(bounded);
  }, [total]);

  const prev = () => goTo(current - 1);
  const next = () => goTo(current + 1);

  // Touch swipe
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    touchStartX.current = null;
  };

  return (
    <section className="section-vt" aria-labelledby="vt-heading" id="video-testimonials">
      {/* Section Header */}
      <div className="content-container">
        <div className="vt-header">
          <h2 className="vt-heading" id="vt-heading">Real People. Real Experiences.</h2>
          <p className="vt-subheading">
            Sometimes, one conversation is all it takes to see things differently.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="vt-carousel-wrap"
          ref={wrapRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Arrow: Prev */}
          <button
            className="vt-arrow vt-arrow-prev"
            onClick={prev}
            disabled={current === 0}
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          {/* Track */}
          <div className="vt-track-outer">
            <div
              ref={trackRef}
              className="vt-track"
              style={{ transform: `translateX(-${translatePx}px)` }}
            >
              {testimonials.map((item) => (
                <VideoCard
                  key={item.id}
                  item={item}
                  activeId={activeId}
                  onPlay={handlePlay}
                />
              ))}
            </div>
          </div>

          {/* Arrow: Next */}
          <button
            className="vt-arrow vt-arrow-next"
            onClick={next}
            disabled={current === total - 1}
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>

        {/* Dot indicators */}
        <div className="vt-dots" aria-label="Carousel navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`vt-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA below videos */}
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
