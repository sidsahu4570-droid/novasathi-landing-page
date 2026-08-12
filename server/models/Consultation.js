import mongoose from 'mongoose';

const ALLOWED_TOPICS = [
  'Love & Relationships',
  'Career & Money',
  'Future & Astrology',
  'Tarot & Numerology',
  'Vastu & Life Energy',
  'Someone to Talk To',
];

const ALLOWED_MODES = ['Chat', 'Call', 'Video'];

const ALLOWED_STATUSES = [
  'pending',
  'called',
  'connected',
  'no_answer',
  'completed',
  'cancelled',
];

const consultationSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      enum: { values: ALLOWED_TOPICS, message: 'Invalid topic' },
    },
    mode: {
      type: String,
      required: [true, 'Mode is required'],
      enum: { values: ALLOWED_MODES, message: 'Invalid mode' },
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'],
    },
    status: {
      type: String,
      enum: { values: ALLOWED_STATUSES, message: 'Invalid status' },
      default: 'pending',
    },
    adminNotes: {
      type: String,
      default: '',
      maxlength: 500,
    },
  },
  {
    timestamps: true, // auto-creates createdAt and updatedAt
  }
);

// Index for efficient status filtering & sorting
consultationSchema.index({ status: 1, createdAt: -1 });

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;
