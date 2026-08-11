import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    service: {
      type: String,
      enum: ['Vedic Astrology', 'Tarot Reading', 'Numerology', 'Vastu', 'Dil Ki Baat'],
    },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    review: { type: String, required: true, trim: true },
    avatar: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
