import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import ReviewVideo from '../models/ReviewVideo.js';
import requireAdmin from '../middleware/auth.js';

const router = express.Router();

// Ensure local upload directories exist
const uploadDirVideos = path.join(process.cwd(), 'public', 'uploads', 'videos');
const uploadDirThumbnails = path.join(process.cwd(), 'public', 'uploads', 'thumbnails');
if (!fs.existsSync(uploadDirVideos)) fs.mkdirSync(uploadDirVideos, { recursive: true });
if (!fs.existsSync(uploadDirThumbnails)) fs.mkdirSync(uploadDirThumbnails, { recursive: true });

// Helper: Check if file is a video
function isVideoFile(file) {
  const isVideoMime = file.mimetype && file.mimetype.startsWith('video/');
  const isVideoExt = /\.(mp4|webm|mov|m4v|mkv|avi)$/i.test(file.originalname);
  return isVideoMime || isVideoExt;
}

// Configure Multer disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (isVideoFile(file)) {
      cb(null, uploadDirVideos);
    } else {
      cb(null, uploadDirThumbnails);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname).toLowerCase();
    const prefix = isVideoFile(file) ? 'video' : 'thumb';
    cb(null, `${prefix}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    if (isVideoFile(file)) {
      const allowedVideo = /\.(mp4|webm|mov|m4v|mkv|avi)$/i;
      if (!file.originalname.match(allowedVideo)) {
        return cb(new Error('Only MP4, WebM, MOV, and AVI video files are allowed!'), false);
      }
    } else {
      const allowedImage = /\.(jpg|jpeg|png|webp|avif)$/i;
      if (!file.originalname.match(allowedImage)) {
        return cb(new Error('Only JPG, PNG, WEBP, and AVIF image files are allowed!'), false);
      }
    }
    cb(null, true);
  },
});

// Configure Cloudinary if environment variables exist
const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Helper: Delete file from local disk or Cloudinary
async function deleteMediaFile(fileUrl, publicId, resourceType = 'video') {
  if (isCloudinaryConfigured && publicId) {
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    } catch (err) {
      console.error('Cloudinary destroy error:', err);
    }
  }

  if (fileUrl && fileUrl.startsWith('/uploads/')) {
    const localPath = path.join(process.cwd(), 'public', fileUrl);
    if (fs.existsSync(localPath)) {
      try {
        fs.unlinkSync(localPath);
      } catch (err) {
        console.error('Local file delete error:', err);
      }
    }
  }
}

// ─── PUBLIC ROUTES ────────────────────────────────────────────────────────────

/**
 * GET /api/reviews
 * Returns list of published review videos sorted by displayOrder ASC, createdAt DESC.
 */
router.get('/', async (req, res) => {
  try {
    const reviews = await ReviewVideo.find({ published: true })
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    const formatted = reviews.map((r) => ({
      id: r._id,
      name: r.name,
      category: r.category,
      rating: r.rating,
      reviewText: r.reviewText,
      videoUrl: r.videoUrl,
      thumbnailUrl: r.thumbnailUrl,
      displayOrder: r.displayOrder,
      createdAt: r.createdAt,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('GET /api/reviews error:', err);
    res.status(500).json({ error: 'Failed to fetch review videos.' });
  }
});

// ─── ADMIN ROUTES (PROTECTED) ──────────────────────────────────────────────────

/**
 * GET /api/admin/reviews
 * Returns all reviews (published and drafts).
 */
router.get('/admin/list', requireAdmin, async (req, res) => {
  try {
    const reviews = await ReviewVideo.find()
      .sort({ displayOrder: 1, createdAt: -1 })
      .lean();

    res.json(reviews);
  } catch (err) {
    console.error('GET /api/admin/reviews error:', err);
    res.status(500).json({ error: 'Failed to fetch reviews for admin.' });
  }
});

/**
 * POST /api/admin/reviews/upload
 * Handles file upload (video or thumbnail image).
 */
router.post(
  '/admin/upload',
  requireAdmin,
  (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      const isVideo = isVideoFile(req.file);
      const localUrl = `/uploads/${isVideo ? 'videos' : 'thumbnails'}/${req.file.filename}`;
      let finalUrl = localUrl;
      let publicId = '';

      // Upload to Cloudinary if configured
      if (isCloudinaryConfigured) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: `novasathi/${isVideo ? 'videos' : 'thumbnails'}`,
            resource_type: isVideo ? 'video' : 'image',
          });
          finalUrl = result.secure_url;
          publicId = result.public_id;
        } catch (cErr) {
          console.warn('Cloudinary upload fallback to local storage:', cErr.message);
        }
      }

      res.json({
        success: true,
        url: finalUrl,
        publicId,
        filename: req.file.originalname,
        size: req.file.size,
      });
    } catch (err) {
      console.error('POST /api/admin/reviews/upload error:', err);
      res.status(500).json({ error: err.message || 'File upload failed.' });
    }
  }
);

/**
 * POST /api/admin/reviews
 * Creates a new review video record.
 */
router.post('/admin/create', requireAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      rating,
      reviewText,
      videoUrl,
      videoPublicId,
      thumbnailUrl,
      thumbnailPublicId,
      published,
      displayOrder,
    } = req.body;

    if (!name || !category || !reviewText || !videoUrl) {
      return res.status(400).json({
        error: 'Customer name, category, review text, and video are required.',
      });
    }

    const review = new ReviewVideo({
      name,
      category,
      rating: Number(rating) || 5,
      reviewText,
      videoUrl,
      videoPublicId: videoPublicId || '',
      thumbnailUrl: thumbnailUrl || '',
      thumbnailPublicId: thumbnailPublicId || '',
      published: Boolean(published),
      displayOrder: Number(displayOrder) || 0,
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'Review video created successfully.',
      review,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join('. ') });
    }
    console.error('POST /api/admin/reviews error:', err);
    res.status(500).json({ error: 'Failed to create review video.' });
  }
});

/**
 * PUT /api/admin/reviews/:id
 * Updates an existing review video.
 */
router.put('/admin/:id', requireAdmin, async (req, res) => {
  try {
    const {
      name,
      category,
      rating,
      reviewText,
      videoUrl,
      videoPublicId,
      thumbnailUrl,
      thumbnailPublicId,
      published,
      displayOrder,
    } = req.body;

    const existing = await ReviewVideo.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ error: 'Review video not found.' });
    }

    // Clean up old media if replaced
    if (videoUrl && videoUrl !== existing.videoUrl) {
      await deleteMediaFile(existing.videoUrl, existing.videoPublicId, 'video');
    }
    if (thumbnailUrl && thumbnailUrl !== existing.thumbnailUrl) {
      await deleteMediaFile(existing.thumbnailUrl, existing.thumbnailPublicId, 'image');
    }

    existing.name = name ?? existing.name;
    existing.category = category ?? existing.category;
    existing.rating = rating !== undefined ? Number(rating) : existing.rating;
    existing.reviewText = reviewText ?? existing.reviewText;
    existing.videoUrl = videoUrl ?? existing.videoUrl;
    existing.videoPublicId = videoPublicId ?? existing.videoPublicId;
    existing.thumbnailUrl = thumbnailUrl ?? existing.thumbnailUrl;
    existing.thumbnailPublicId = thumbnailPublicId ?? existing.thumbnailPublicId;
    existing.published = published !== undefined ? Boolean(published) : existing.published;
    existing.displayOrder = displayOrder !== undefined ? Number(displayOrder) : existing.displayOrder;

    await existing.save();

    res.json({
      success: true,
      message: 'Review video updated successfully.',
      review: existing,
    });
  } catch (err) {
    console.error('PUT /api/admin/reviews/:id error:', err);
    res.status(500).json({ error: 'Failed to update review video.' });
  }
});

/**
 * PATCH /api/admin/reviews/:id/publish
 * Toggles published status.
 */
router.patch('/admin/:id/publish', requireAdmin, async (req, res) => {
  try {
    const { published } = req.body;
    if (published === undefined) {
      return res.status(400).json({ error: 'Published state is required.' });
    }

    const review = await ReviewVideo.findByIdAndUpdate(
      req.params.id,
      { published: Boolean(published) },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ error: 'Review video not found.' });
    }

    res.json({
      success: true,
      message: `Review ${review.published ? 'published' : 'unpublished'} successfully.`,
      review,
    });
  } catch (err) {
    console.error('PATCH /api/admin/reviews/:id/publish error:', err);
    res.status(500).json({ error: 'Failed to update published state.' });
  }
});

/**
 * DELETE /api/admin/reviews/:id
 * Deletes a review video and removes associated video/thumbnail media.
 */
router.delete('/admin/:id', requireAdmin, async (req, res) => {
  try {
    const review = await ReviewVideo.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review video not found.' });
    }

    // Clean up media files
    await deleteMediaFile(review.videoUrl, review.videoPublicId, 'video');
    if (review.thumbnailUrl) {
      await deleteMediaFile(review.thumbnailUrl, review.thumbnailPublicId, 'image');
    }

    await ReviewVideo.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Review video deleted successfully.',
    });
  } catch (err) {
    console.error('DELETE /api/admin/reviews/:id error:', err);
    res.status(500).json({ error: 'Failed to delete review video.' });
  }
});

export default router;
