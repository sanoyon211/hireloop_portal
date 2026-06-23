const express = require('express');
const {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getAllPayments
} = require('../controllers/adminController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply Admin Guard to all routes in this file
router.use(verifyToken);
router.use(checkRole(['Admin']));

// @route   GET /api/admin/stats
// @desc    Get dashboard statistics (users, jobs, revenue, charts)
router.get('/stats', getDashboardStats);

// @route   GET /api/admin/users
// @desc    Get all users (with search and filter)
router.get('/users', getAllUsers);

// @route   PATCH /api/admin/users/:id/role
// @desc    Update a user's role (e.g., Seeker to Recruiter)
router.patch('/users/:id/role', updateUserRole);

// @route   PATCH /api/admin/users/:id/status
// @desc    Toggle a user's active status (Suspend/Activate)
router.patch('/users/:id/status', toggleUserStatus);

// @route   GET /api/admin/payments
// @desc    Get all payments and subscription summaries
router.get('/payments', getAllPayments);

module.exports = router;
