import express from 'express';
import OfferSettings from '../models/OfferSettings.js';
import requireAdmin from '../middleware/auth.js';

const router = express.Router();

// Helper to get or create default offer settings
async function getOrCreateOffer() {
  let offer = await OfferSettings.findOne();
  if (!offer) {
    offer = new OfferSettings({
      active: true,
      title: 'Your First 5 Minutes Are Free',
      dailyLimit: 50,
      sessionsUsed: 38,
      showCountdown: false,
      showRemainingSlots: true,
      urgencyMessage: 'Limited introductory sessions available today',
    });
    await offer.save();
  }
  return offer;
}

/**
 * GET /api/offer
 * Public endpoint returning current offer status & remaining sessions.
 */
router.get('/', async (req, res) => {
  try {
    const offer = await getOrCreateOffer();
    const remaining = Math.max(0, offer.dailyLimit - offer.sessionsUsed);

    res.json({
      active: offer.active,
      title: offer.title,
      endDate: offer.endDate,
      dailyLimit: offer.dailyLimit,
      sessionsUsed: offer.sessionsUsed,
      remainingSlots: remaining,
      showCountdown: offer.showCountdown,
      showRemainingSlots: offer.showRemainingSlots,
      urgencyMessage: offer.urgencyMessage,
    });
  } catch (err) {
    console.error('GET /api/offer error:', err);
    res.status(500).json({ error: 'Failed to fetch offer settings.' });
  }
});

/**
 * PATCH /api/admin/offer
 * Protected admin endpoint to update offer & urgency configuration.
 */
router.patch('/admin/update', requireAdmin, async (req, res) => {
  try {
    let offer = await getOrCreateOffer();

    const {
      active,
      title,
      endDate,
      dailyLimit,
      sessionsUsed,
      showCountdown,
      showRemainingSlots,
      urgencyMessage,
    } = req.body;

    if (active !== undefined) offer.active = Boolean(active);
    if (title !== undefined) offer.title = String(title).trim();
    if (endDate !== undefined) offer.endDate = endDate ? new Date(endDate) : null;
    if (dailyLimit !== undefined) offer.dailyLimit = Number(dailyLimit) || 0;
    if (sessionsUsed !== undefined) offer.sessionsUsed = Number(sessionsUsed) || 0;
    if (showCountdown !== undefined) offer.showCountdown = Boolean(showCountdown);
    if (showRemainingSlots !== undefined) offer.showRemainingSlots = Boolean(showRemainingSlots);
    if (urgencyMessage !== undefined) offer.urgencyMessage = String(urgencyMessage).trim();

    await offer.save();

    res.json({
      success: true,
      message: 'Offer and urgency settings updated successfully.',
      offer,
    });
  } catch (err) {
    console.error('PATCH /api/admin/offer error:', err);
    res.status(500).json({ error: 'Failed to update offer settings.' });
  }
});

export default router;
