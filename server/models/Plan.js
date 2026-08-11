import mongoose from 'mongoose';

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true },
    pricePerMin: { type: Number },
    description: { type: String, trim: true },
    features: [{ type: String }],
    isPopular: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    cta: { type: String, default: 'Get Started' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Plan = mongoose.model('Plan', planSchema);

export default Plan;
