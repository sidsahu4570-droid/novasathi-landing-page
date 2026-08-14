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
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes countdown target
    },
    dailyLimit: {
      type: Number,
      default: 12,
    },
    sessionsUsed: {
      type: Number,
      default: 0,
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
    isDemoMode: {
      type: Boolean,
      default: false,
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
