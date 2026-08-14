import mongoose from 'mongoose';

const offerSettingsSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: 'Your First 5 Minutes Are Free',
    },
    endDate: {
      type: Date,
      default: () => new Date(Date.now() + 4 * 3600 * 1000 + 27 * 60 * 1000), // Default ~4 hours 27 min
    },
    dailyLimit: {
      type: Number,
      default: 50,
    },
    sessionsUsed: {
      type: Number,
      default: 38,
    },
    expertsAvailableCount: {
      type: Number,
      default: 3,
    },
    showCountdown: {
      type: Boolean,
      default: true,
    },
    showRemainingSlots: {
      type: Boolean,
      default: true,
    },
    urgencyMessage: {
      type: String,
      default: 'Limited introductory sessions available today',
    },
  },
  {
    timestamps: true,
  }
);

const OfferSettings = mongoose.model('OfferSettings', offerSettingsSchema);

export default OfferSettings;
