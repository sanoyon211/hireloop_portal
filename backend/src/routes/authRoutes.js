const express = require('express');
const { syncUser } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/auth/sync
// Syncs a user from Firebase to MongoDB
router.post('/sync', verifyToken, syncUser);

module.exports = router;
