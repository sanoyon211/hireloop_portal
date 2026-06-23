const express = require('express');
const {
  registerCompany,
  getMyCompany,
  updateMyCompany,
  getAllCompanies,
  updateCompanyStatus
} = require('../controllers/companyController');
const { verifyToken, checkRole, optionalVerifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// @route   GET /api/companies
// @desc    Get all companies (Admin sees all, Public sees Approved)
// @access  Public / Admin
router.get('/', optionalVerifyToken, getAllCompanies);

// @route   POST /api/companies
// @desc    Register a new company
// @access  Private (Recruiters only)
router.post('/', verifyToken, checkRole(['Recruiter']), registerCompany);

// @route   GET /api/companies/my-company
// @desc    Get the company of the logged-in recruiter
// @access  Private (Recruiters only)
router.get('/my-company', verifyToken, checkRole(['Recruiter']), getMyCompany);

// @route   PUT /api/companies/my-company
// @desc    Update the company of the logged-in recruiter
// @access  Private (Recruiters only)
router.put('/my-company', verifyToken, checkRole(['Recruiter']), updateMyCompany);

// @route   PATCH /api/companies/:id/status
// @desc    Update company status (Approve or Reject)
// @access  Private (Admins only)
router.patch('/:id/status', verifyToken, checkRole(['Admin']), updateCompanyStatus);

module.exports = router;
