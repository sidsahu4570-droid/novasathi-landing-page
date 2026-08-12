import mongoose from 'mongoose';

const ALLOWED_CATEGORIES = [
  'Love & Relationships',
  'Career & Money',
  'Future & Astrology',
  'Tarot & Numerology',
  'Vastu & Life Energy',
  'Someone to Talk To',
  'Tarot & Guidance',
];

const reviewVideoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
      maxlength: 1000,
    },
    videoUrl: {
      type: String,
      required: [true, 'Video URL is required'],
    },
    videoPublicId: {
      type: String,
      default: '',
    },
    thumbnailUrl: {
      type: String,
      default: '',
    },
    thumbnailPublicId: {
      type: String,
      default: '',
    },
    published: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient sorting by displayOrder and createdAt
reviewVideoSchema.index({ published: 1, displayOrder: 1, createdAt: -1 });

const ReviewVideo = mongoose.model('ReviewVideo', reviewVideoSchema);

export default ReviewVideo;
