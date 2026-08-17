import express from 'express';
import OfferSettings from '../models/OfferSettings.js';
import requireAdmin from '../middleware/auth.js';

const router = express.Router();

async function getOrCreateOffer() {
  let offer = await OfferSettings.findOne();
  if (!offer) {
    offer = new OfferSettings({
      active: true,
      title: 'Your First 5 Minutes Are Free',
      dailyLimit: 12,
      sessionsUsed: 0,
      expertsAvailableCount: 3,
      showCountdown: true,
      showRemainingSlots: true,
      isDemoMode: false,
      urgencyMessage: 'Limited introductory sessions available today',
      endDate: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });
    await offer.save();
  } else if (offer.dailyLimit === 50) {
    offer.dailyLimit = 12;
    offer.sessionsUsed = 0;
    await offer.save();
  }
  return offer;
}

/**
 * GET /api/offer
 * Returns live active offer, remaining slots, experts available, and 10-min countdown end time.
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
      expertsAvailableCount: offer.expertsAvailableCount || 3,
      showCountdown: offer.showCountdown,
      showRemainingSlots: offer.showRemainingSlots,
      isDemoMode: Boolean(offer.isDemoMode),
      urgencyMessage: offer.urgencyMessage,
    });
  } catch (err) {
    console.error('GET /api/offer error:', err);
    res.status(500).json({ error: 'Failed to fetch offer settings.' });
  }
});

/**
 * PATCH /api/admin/update
 * Admin route to update offer settings.
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
      expertsAvailableCount,
      showCountdown,
      showRemainingSlots,
      isDemoMode,
      urgencyMessage,
    } = req.body;

    if (active !== undefined) offer.active = Boolean(active);
    if (title !== undefined) offer.title = String(title).trim();
    if (endDate !== undefined) offer.endDate = endDate ? new Date(endDate) : offer.endDate;
    if (dailyLimit !== undefined) offer.dailyLimit = Number(dailyLimit) >= 0 ? Number(dailyLimit) : offer.dailyLimit;
    if (sessionsUsed !== undefined) offer.sessionsUsed = Number(sessionsUsed) >= 0 ? Number(sessionsUsed) : offer.sessionsUsed;
    if (expertsAvailableCount !== undefined) offer.expertsAvailableCount = Number(expertsAvailableCount) || 0;
    if (showCountdown !== undefined) offer.showCountdown = Boolean(showCountdown);
    if (showRemainingSlots !== undefined) offer.showRemainingSlots = Boolean(showRemainingSlots);
    if (isDemoMode !== undefined) offer.isDemoMode = Boolean(isDemoMode);
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
