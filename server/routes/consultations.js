import express from 'express';
import Consultation from '../models/Consultation.js';
import requireAdmin from '../middleware/auth.js';

const router = express.Router();

const ALLOWED_STATUSES = ['pending', 'called', 'connected', 'no_answer', 'completed', 'cancelled'];

/**
 * POST /api/consultations
 * Public — Creates a new consultation request.
 * Status is always forced to "pending" server-side.
 */
router.post('/', async (req, res) => {
  try {
    const { topic, mode, phone } = req.body;

    if (!topic || !mode || !phone) {
      return res.status(400).json({ error: 'Topic, mode, and phone number are required.' });
    }

    // Normalize phone: strip +91 prefix if user typed it
    const cleanPhone = String(phone).replace(/^\+?91/, '').replace(/\D/g, '');

    const consultation = new Consultation({
      topic,
      mode,
      phone: cleanPhone,
      status: 'pending', // always set server-side
    });

    await consultation.save();

    res.status(201).json({
      success: true,
      message: 'Consultation request received successfully.',
      id: consultation._id,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join('. ') });
    }
    console.error('POST /consultations error:', err);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
});

/**
 * GET /api/consultations/stats
 * Admin-only — Returns per-status counts.
 * MUST be defined before /:id to avoid "stats" being parsed as an id.
 */
router.get('/stats', requireAdmin, async (req, res) => {
  try {
    const stats = await Consultation.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const result = { pending: 0, called: 0, connected: 0, no_answer: 0, completed: 0, cancelled: 0 };
    stats.forEach(({ _id, count }) => {
      if (result.hasOwnProperty(_id)) result[_id] = count;
    });

    res.json(result);
  } catch (err) {
    console.error('GET /consultations/stats error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /api/consultations
 * Admin-only — Returns all requests. Optional ?status= filter.
 */
router.get('/', requireAdmin, async (req, res) => {
  try {
    const filter = {};
    if (req.query.status && ALLOWED_STATUSES.includes(req.query.status)) {
      filter.status = req.query.status;
    }

    const consultations = await Consultation.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    res.json(consultations);
  } catch (err) {
    console.error('GET /consultations error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /api/consultations/:id
 * Admin-only — Returns single request.
 */
router.get('/:id', requireAdmin, async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id).lean();
    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });
    res.json(consultation);
  } catch (err) {
    console.error('GET /consultations/:id error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * PATCH /api/consultations/:id/status
 * Admin-only — Updates status.
 */
router.patch('/:id/status', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Allowed: ${ALLOWED_STATUSES.join(', ')}` });
    }

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });
    res.json({ success: true, consultation });
  } catch (err) {
    console.error('PATCH /consultations/:id/status error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * PATCH /api/consultations/:id/notes
 * Admin-only — Updates admin notes.
 */
router.patch('/:id/notes', requireAdmin, async (req, res) => {
  try {
    const { adminNotes } = req.body;
    if (adminNotes === undefined) {
      return res.status(400).json({ error: 'adminNotes field is required' });
    }

    const consultation = await Consultation.findByIdAndUpdate(
      req.params.id,
      { adminNotes: String(adminNotes).slice(0, 500) },
      { new: true }
    );

    if (!consultation) return res.status(404).json({ error: 'Consultation not found' });
    res.json({ success: true, consultation });
  } catch (err) {
    console.error('PATCH /consultations/:id/notes error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
