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
      default: () => {
        // Default to end of current day (11:59:59 PM)
        const d = new Date();
        d.setHours(23, 59, 59, 999);
        return d;
      },
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
