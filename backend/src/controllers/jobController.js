const Job = require('../models/Job');
const Company = require('../models/Company');
const User = require('../models/User');

const PLAN_LIMITS = {
  Free: 3,
  Pro: 5,       // Assuming 5 based on other limits, adjust if needed
  Premium: 8,   // Assuming 8 based on other limits, adjust if needed
  Growth: 10,
  Enterprise: 50
};

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Recruiters only)
const createJob = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Verify if recruiter has an 'Approved' company
    const company = await Company.findOne({ recruiterId: userId });
    if (!company) {
      return res.status(403).json({ message: 'You must register a company first.' });
    }
    if (company.status !== 'Approved') {
      return res.status(403).json({ message: 'Your company profile is still pending or rejected. Cannot post jobs.' });
    }

    // 2. Check subscription limits
    const limit = PLAN_LIMITS[req.user.currentPlan] || 3;
    if (req.user.activeJobsCount >= limit) {
      return res.status(403).json({ 
        message: `Job limit reached for ${req.user.currentPlan} plan. Please upgrade to post more jobs.`,
        limit
      });
    }

    // 3. Create the job
    const { title, description, responsibilities, requirements, category, jobType, location, salaryRange, status } = req.body;
    
    // Determine the status (defaults to Active if not provided)
    const initialStatus = status || 'Active';

    const newJob = new Job({
      title,
      description,
      responsibilities,
      requirements,
      category,
      jobType,
      location,
      salaryRange,
      status: initialStatus,
      companyId: company._id,
      recruiterId: userId
    });

    const savedJob = await newJob.save();

    // 4. If job is active, increment activeJobsCount
    if (initialStatus === 'Active') {
      await User.findByIdAndUpdate(userId, { $inc: { activeJobsCount: 1 } });
    }

    res.status(201).json({ message: 'Job created successfully', job: savedJob });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error while creating job.' });
  }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
// @access  Private (Recruiters and Admins)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    // Authorization check
    if (req.user.role === 'Recruiter' && job.recruiterId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this job.' });
    }

    const { status: newStatus, ...updateData } = req.body;
    const oldStatus = job.status;

    // Handle Active Jobs count logic if status is being updated
    if (newStatus && newStatus !== oldStatus) {
      const limit = PLAN_LIMITS[req.user.currentPlan] || 3;
      
      // If going from Closed/Draft to Active, check limit
      if (newStatus === 'Active' && oldStatus !== 'Active') {
        // Find owner to check their limit (useful if Admin is changing it, but usually Recruiter changes it)
        const owner = await User.findById(job.recruiterId);
        if (owner.activeJobsCount >= PLAN_LIMITS[owner.currentPlan]) {
          return res.status(403).json({ message: 'Cannot activate job. Recruiter job limit reached.' });
        }
        await User.findByIdAndUpdate(job.recruiterId, { $inc: { activeJobsCount: 1 } });
      }
      
      // If going from Active to Closed/Draft, decrement limit
      if (oldStatus === 'Active' && newStatus !== 'Active') {
        await User.findByIdAndUpdate(job.recruiterId, { $inc: { activeJobsCount: -1 } });
      }

      job.status = newStatus;
    }

    // Apply other updates
    Object.assign(job, updateData);
    const updatedJob = await job.save();

    res.status(200).json({ message: 'Job updated successfully.', job: updatedJob });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Server error while updating job.' });
  }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
// @access  Private (Recruiters and Admins)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    // Authorization check
    if (req.user.role === 'Recruiter' && job.recruiterId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to delete this job.' });
    }

    // Decrement active jobs count if it was active
    if (job.status === 'Active') {
      await User.findByIdAndUpdate(job.recruiterId, { $inc: { activeJobsCount: -1 } });
    }

    await job.deleteOne();

    res.status(200).json({ message: 'Job deleted successfully.' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error while deleting job.' });
  }
};

// @desc    Get all active jobs with filtering and pagination
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const { keyword, location, category, jobType, page = 1, limit = 10 } = req.query;

    let query = { status: 'Active' };

    // Filtering
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } }
      ];
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (category) query.category = category;
    if (jobType) query.jobType = jobType;

    // Pagination configuration
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const jobs = await Job.find(query)
      .populate('companyId', 'name logoUrl location websiteUrl')
      .skip(skip)
      .limit(limitNumber)
      .sort({ createdAt: -1 });

    const totalJobs = await Job.countDocuments(query);

    res.status(200).json({
      jobs,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalJobs / limitNumber),
      totalJobs
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error while fetching jobs.' });
  }
};

// @desc    Get a single job by ID
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('companyId', 'name logoUrl location websiteUrl industry description employeeCount')
      .populate('recruiterId', 'name avatar');
      
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }
    
    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ message: 'Server error while fetching job details.' });
  }
};

// @desc    Get jobs created by the logged-in recruiter
// @route   GET /api/jobs/my-jobs
// @access  Private (Recruiters only)
const getMyJobs = async (req, res) => {
  try {
    // Return all jobs (Active, Closed, Draft) created by this recruiter
    const jobs = await Job.find({ recruiterId: req.user._id })
      .populate('companyId', 'name logoUrl')
      .sort({ createdAt: -1 });
      
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching my jobs:', error);
    res.status(500).json({ message: 'Server error while fetching my jobs.' });
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJobs,
  getJobById,
  getMyJobs
};
