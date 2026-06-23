const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Payment = require('../models/Payment');

const PLAN_PRICES = {
  Seeker: {
    Pro: 1900,      // $19.00
    Premium: 3900   // $39.00
  },
  Recruiter: {
    Growth: 4900,     // $49.00
    Enterprise: 14900 // $149.00
  }
};

// @desc    Create Stripe Checkout Session
// @route   POST /api/payments/create-checkout-session
// @access  Private
const createCheckoutSession = async (req, res) => {
  try {
    const { planName } = req.body;
    const userRole = req.user.role;
    const userId = req.user._id.toString();

    // 1. Validate role and requested plan
    if (!PLAN_PRICES[userRole] || !PLAN_PRICES[userRole][planName]) {
      return res.status(400).json({ message: 'Invalid plan selected for your account type.' });
    }

    const priceInCents = PLAN_PRICES[userRole][planName];

    // 2. Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `HireLoop ${planName} Plan (${userRole})`,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      // Replace these URLs with the actual frontend deployment URLs
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment-canceled`,
      
      // 3. Attach metadata crucial for the webhook handler
      metadata: {
        userId,
        userRole,
        planName,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Server error while creating checkout session.' });
  }
};

// @desc    Stripe Webhook listener
// @route   POST /api/payments/webhook
// @access  Public (Must be parsed as Raw Body)
const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // req.body must be a raw buffer. The signature validation will fail if express.json() mutated it.
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the successful payment event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Extract metadata injected during checkout creation
    const { userId, userRole, planName } = session.metadata;

    try {
      // 1. Update the User's plan in MongoDB
      const updateData = { currentPlan: planName };
      
      // If a Seeker upgrades, reset their application counter
      if (userRole === 'Seeker') {
        updateData.planApplicationsUsed = 0;
      }

      await User.findByIdAndUpdate(userId, updateData);

      // 2. Log the successful transaction in the Payment collection
      const payment = new Payment({
        userId,
        planName,
        amount: session.amount_total / 100, // Convert cents to dollars
        transactionId: session.id,
        status: 'Success' // Model accepts 'Success', 'Pending', 'Failed'
      });

      await payment.save();
      console.log(`Payment successful. User ${userId} upgraded to ${planName} Plan.`);

    } catch (error) {
      console.error('Error processing webhook database update:', error);
      // Return 500 to prompt Stripe to retry the webhook delivery
      return res.status(500).send('Internal server error during DB update.');
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send();
};

module.exports = {
  createCheckoutSession,
  stripeWebhook,
};
