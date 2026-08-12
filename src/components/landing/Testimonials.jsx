import React from 'react';

/**
 * Testimonials — Section 6 (3 Compact Real Testimonials)
 * Social proof validating career clarity, love perspective, and non-judgmental emotional support.
 */
export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      quote: "I was so confused about my career path. The session gave me so much clarity.",
      author: "Rahul",
      service: "Career Astrology"
    },
    {
      id: 2,
      quote: "The Tarot reading gave me the perspective I needed.",
      author: "Tanvi",
      service: "Tarot & Love"
    },
    {
      id: 3,
      quote: "Sometimes you just need someone to listen. I felt much lighter afterwards.",
      author: "Rohan",
      service: "Emotional Support"
    }
  ];

  return (
    <section id="testimonials" className="section-testimonials content-container">
      <h2 className="section-title">Real People. Real Clarity.</h2>
      <p className="section-subtitle">
        See how others found their perspective when they needed it most.
      </p>

      <div className="testimonials-grid">
        {reviews.map((rev) => (
          <div key={rev.id} className="glass-card testimonial-card">
            <div>
              <div className="stars">★★★★★</div>
              <p className="testimonial-quote">"{rev.quote}"</p>
            </div>
            <div>
              <div className="testimonial-author">— {rev.author}</div>
              <span className="testimonial-service">{rev.service}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
