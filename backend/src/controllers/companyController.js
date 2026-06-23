const Company = require('../models/Company');

// @desc    Register a new company
// @route   POST /api/companies
// @access  Private (Recruiters only)
const registerCompany = async (req, res) => {
  try {
    // Check if the recruiter already has a company registered
    const existingCompany = await Company.findOne({ recruiterId: req.user._id });
    if (existingCompany) {
      return res.status(400).json({ message: 'A recruiter can only register one company.' });
    }

    const { name, industry, websiteUrl, location, employeeCount, logoUrl, description } = req.body;

    const company = new Company({
      name,
      industry,
      websiteUrl,
      location,
      employeeCount,
      logoUrl,
      description,
      recruiterId: req.user._id,
      status: 'Pending', // Default status requiring admin approval
    });

    const savedCompany = await company.save();
    res.status(201).json({ message: 'Company registered successfully. Pending admin approval.', company: savedCompany });
  } catch (error) {
    console.error('Error registering company:', error);
    res.status(500).json({ message: 'Server error while registering company.' });
  }
};

// @desc    Get the company of the logged-in recruiter
// @route   GET /api/companies/my-company
// @access  Private (Recruiters only)
const getMyCompany = async (req, res) => {
  try {
    const company = await Company.findOne({ recruiterId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company not found for this recruiter.' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching my company:', error);
    res.status(500).json({ message: 'Server error while fetching company.' });
  }
};

// @desc    Update the company of the logged-in recruiter
// @route   PUT /api/companies/my-company
// @access  Private (Recruiters only)
const updateMyCompany = async (req, res) => {
  try {
    const { name, industry, websiteUrl, location, employeeCount, logoUrl, description } = req.body;

    const company = await Company.findOne({ recruiterId: req.user._id });
    if (!company) {
      return res.status(404).json({ message: 'Company not found for this recruiter.' });
    }

    // Update allowed fields
    if (name !== undefined) company.name = name;
    if (industry !== undefined) company.industry = industry;
    if (websiteUrl !== undefined) company.websiteUrl = websiteUrl;
    if (location !== undefined) company.location = location;
    if (employeeCount !== undefined) company.employeeCount = employeeCount;
    if (logoUrl !== undefined) company.logoUrl = logoUrl;
    if (description !== undefined) company.description = description;

    const updatedCompany = await company.save();
    res.status(200).json({ message: 'Company updated successfully.', company: updatedCompany });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ message: 'Server error while updating company.' });
  }
};

// @desc    Get all companies
// @route   GET /api/companies
// @access  Public or Private (Admins see all, others see only Approved)
const getAllCompanies = async (req, res) => {
  try {
    let query = {};

    // If user is logged in and is an Admin, they can see all companies (Pending, Approved, Rejected)
    if (req.user && req.user.role === 'Admin') {
      // no filters applied to query
    } else {
      // Normal users, seekers, or unauthenticated public users can only see 'Approved' companies
      query.status = 'Approved';
    }

    const companies = await Company.find(query).populate('recruiterId', 'name email avatar');
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching all companies:', error);
    res.status(500).json({ message: 'Server error while fetching companies.' });
  }
};

// @desc    Update company status
// @route   PATCH /api/companies/:id/status
// @access  Private (Admins only)
const updateCompanyStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status. Must be Approved or Rejected.' });
    }

    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found.' });
    }

    company.status = status;
    const updatedCompany = await company.save();

    res.status(200).json({ message: `Company status updated to ${status}.`, company: updatedCompany });
  } catch (error) {
    console.error('Error updating company status:', error);
    res.status(500).json({ message: 'Server error while updating company status.' });
  }
};

module.exports = {
  registerCompany,
  getMyCompany,
  updateMyCompany,
  getAllCompanies,
  updateCompanyStatus
};
