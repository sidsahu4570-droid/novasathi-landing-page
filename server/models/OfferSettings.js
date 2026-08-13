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
      default: null,
    },
    dailyLimit: {
      type: Number,
      default: 50,
    },
    sessionsUsed: {
      type: Number,
      default: 38,
    },
    showCountdown: {
      type: Boolean,
      default: false,
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
