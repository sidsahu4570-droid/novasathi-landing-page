import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ── Individual Video Card Component ────────────────────────────────────── */
function VideoCard({ item, onOpenLightbox }) {
  return (
    <div className="vt-card" onClick={() => onOpenLightbox(item)}>
      {/* Video / Poster Wrapper */}
      <div className="vt-video-wrap">
        {item.thumbnailUrl ? (
          <img
            src={item.thumbnailUrl}
            alt={item.name}
            className="vt-video"
          />
        ) : (
          <video
            src={item.videoUrl}
            className="vt-video"
            preload="metadata"
            muted
            playsInline
          />
        )}

        {/* Play Button Overlay */}
        <button
          className="vt-play-btn"
          aria-label={`Play testimonial video by ${item.name}`}
          onClick={(e) => {
            e.stopPropagation();
            onOpenLightbox(item);
          }}
        >
          <span className="vt-play-circle">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      </div>

      {/* Card Info */}
      <div className="vt-info">
        <div className="vt-stars" aria-label={`${item.rating || 5} out of 5 stars`}>
          {'★'.repeat(item.rating || 5)}
        </div>
        <p className="vt-quote">"{item.reviewText}"</p>
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
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const lightboxVideoRef = useRef(null);

  // Fetch published reviews from API or localStorage fallback
  useEffect(() => {
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_API_URL || '';

    async function loadReviews() {
      try {
        let loadedData = null;
        const res = await fetch(`${apiUrl}/api/reviews`).catch(() => null);

        if (res && res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            loadedData = await res.json();
          }
        }

        // Fallback to local storage on static Vercel hostings
        if (!loadedData || !Array.isArray(loadedData) || loadedData.length === 0) {
          try {
            const localRaw = localStorage.getItem('ns_admin_reviews');
            if (localRaw) {
              const parsed = JSON.parse(localRaw);
              if (Array.isArray(parsed)) {
                loadedData = parsed.filter((r) => r.published);
              }
            }
          } catch (e) {}
        }

        if (isMounted && loadedData) setReviews(loadedData);
      } catch (err) {
        // Quiet error
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadReviews();
    return () => {
      isMounted = false;
    };
  }, []);

  const total = reviews.length;

  const goTo = useCallback(
    (idx) => setCurrent(Math.max(0, Math.min(total - 1, idx))),
    [total]
  );

  // Mobile touch swipe
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) goTo(current + 1);
    else if (dx > 40) goTo(current - 1);
    touchStartX.current = null;
  };

  // Close Lightbox on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="section-vt" aria-labelledby="vt-heading" id="video-testimonials">
      <div className="content-container">
        {/* Section Header */}
        <div className="vt-header">
          <h2 className="vt-heading" id="vt-heading">
            Real People. Real Experiences.
          </h2>
          <p className="vt-subheading">
            Sometimes, one conversation is all it takes to see things differently.
          </p>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="vt-empty-state">
            <span style={{ fontSize: '1.8rem' }}>⏳</span>
            <p>Loading experiences...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="vt-empty-state">
            <span style={{ fontSize: '2rem', marginBottom: '8px' }}>✨</span>
            <p className="vt-empty-title">Real stories are coming soon.</p>
            <p className="vt-empty-sub">
              Our community is sharing their journey. Check back shortly to hear their experiences.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop: 3-column row */}
            <div className="vt-grid-desktop">
              {reviews.map((item) => (
                <VideoCard
                  key={item.id || item._id}
                  item={item}
                  onOpenLightbox={setLightboxItem}
                />
              ))}
            </div>

            {/* Mobile: 1-card carousel slider */}
            <div
              className="vt-mobile-carousel"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="vt-mobile-track"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {reviews.map((item) => (
                  <div className="vt-mobile-slide" key={item.id || item._id}>
                    <VideoCard item={item} onOpenLightbox={setLightboxItem} />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Nav Arrows & Dots */}
            {total > 1 && (
              <div className="vt-mobile-nav">
                <button
                  className="vt-arrow"
                  onClick={() => goTo(current - 1)}
                  disabled={current === 0}
                  aria-label="Previous"
                >
                  ‹
                </button>
                <div className="vt-dots">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      className={`vt-dot ${i === current ? 'active' : ''}`}
                      onClick={() => goTo(i)}
                      aria-label={`Go to review ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  className="vt-arrow"
                  onClick={() => goTo(current + 1)}
                  disabled={current === total - 1}
                  aria-label="Next"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}

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

      {/* ── VIDEO LIGHTBOX MODAL ────────────────────────────────────────────── */}
      {lightboxItem && (
        <div
          className="vt-lightbox-backdrop"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Video Testimonial Lightbox"
        >
          <div
            className="vt-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="vt-lightbox-close"
              onClick={() => setLightboxItem(null)}
              aria-label="Close video"
            >
              ✕
            </button>

            <div className="vt-lightbox-player-wrap">
              <video
                ref={lightboxVideoRef}
                className="vt-lightbox-player"
                src={lightboxItem.videoUrl}
                poster={lightboxItem.thumbnailUrl}
                controls
                autoPlay
                playsInline
              />
            </div>

            <div className="vt-lightbox-details">
              <div className="vt-stars">
                {'★'.repeat(lightboxItem.rating || 5)}
              </div>
              <p className="vt-quote">"{lightboxItem.reviewText}"</p>
              <div className="vt-author">
                <span className="vt-name">— {lightboxItem.name}</span>
                <span className="vt-category">{lightboxItem.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
