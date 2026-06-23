const express = require('express');
const {
  createJob,
  updateJob,
  deleteJob,
  getJobs,
  getJobById,
  getMyJobs
} = require('../controllers/jobController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all active jobs (with filters/pagination)
// @access  Public
router.get('/', getJobs);

// @route   GET /api/jobs/my-jobs
// @desc    Get jobs created by the logged-in recruiter
// @access  Private (Recruiters only)
// Note: Placed above /:id to prevent route conflicts
router.get('/my-jobs', verifyToken, checkRole(['Recruiter']), getMyJobs);

// @route   GET /api/jobs/:id
// @desc    Get single job by ID
// @access  Public
router.get('/:id', getJobById);

// @route   POST /api/jobs
// @desc    Create a new job
// @access  Private (Recruiters only)
router.post('/', verifyToken, checkRole(['Recruiter']), createJob);

// @route   PUT /api/jobs/:id
// @desc    Update a job
// @access  Private (Recruiters & Admins)
router.put('/:id', verifyToken, checkRole(['Recruiter', 'Admin']), updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
// @access  Private (Recruiters & Admins)
router.delete('/:id', verifyToken, checkRole(['Recruiter', 'Admin']), deleteJob);

module.exports = router;
