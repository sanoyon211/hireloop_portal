const express = require('express');
const {
  createCheckoutSession,
  stripeWebhook,
} = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// @route   POST /api/payments/create-checkout-session
// @desc    Create a Stripe Checkout Session
// @access  Private
router.post('/create-checkout-session', verifyToken, createCheckoutSession);

// @route   POST /api/payments/webhook
// @desc    Stripe Webhook Listener
// @access  Public (Signature verification happens in the controller)
// NOTE: express.raw() is configured for this specific route in server.js
router.post('/webhook', stripeWebhook);

module.exports = router;
