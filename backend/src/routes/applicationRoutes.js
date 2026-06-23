const express = require('express');
const {
  applyForJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus
} = require('../controllers/applicationController');
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

const router = express.Router();

// @route   POST /api/applications
// @desc    Apply for a job
// @access  Private (Seekers only)
router.post('/', verifyToken, checkRole(['Seeker']), applyForJob);

// @route   GET /api/applications/my-applications
// @desc    Get all applications submitted by the logged-in seeker
// @access  Private (Seekers only)
router.get('/my-applications', verifyToken, checkRole(['Seeker']), getMyApplications);

// @route   GET /api/applications/job/:jobId
// @desc    Get all applicants for a specific job
// @access  Private (Recruiters only)
router.get('/job/:jobId', verifyToken, checkRole(['Recruiter']), getJobApplicants);

// @route   PATCH /api/applications/:id/status
// @desc    Update application status (e.g., Shortlisted, Rejected)
// @access  Private (Recruiters only)
router.patch('/:id/status', verifyToken, checkRole(['Recruiter']), updateApplicationStatus);

module.exports = router;
