const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');

const APPLICATION_LIMITS = {
  Free: 3,
  Pro: 30,
  Premium: Infinity,
  Growth: Infinity,
  Enterprise: Infinity
};

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Seekers only)
const applyForJob = async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;
    const seekerId = req.user._id;

    // 1. Check if the job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    if (job.status !== 'Active') {
      return res.status(400).json({ message: 'This job is no longer active and not accepting applications.' });
    }

    // 2. Check if the user has already applied for this job
    const existingApplication = await Application.findOne({ jobId, seekerId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    // 3. Check subscription limits
    const currentPlan = req.user.currentPlan || 'Free';
    const limit = APPLICATION_LIMITS[currentPlan] !== undefined ? APPLICATION_LIMITS[currentPlan] : 3;

    if (req.user.planApplicationsUsed >= limit) {
      return res.status(403).json({ 
        message: `Application limit reached for ${currentPlan} plan. Please upgrade to apply for more jobs.`,
        limit
      });
    }

    // Determine which resume URL to use: explicit one provided, or fallback to profile
    const finalResumeUrl = resumeUrl || req.user.resumeUrl;
    if (!finalResumeUrl) {
      return res.status(400).json({ message: 'A resume URL is required to apply. Please provide one or update your profile.' });
    }

    // 4. Create the application
    const application = new Application({
      jobId,
      seekerId,
      resumeUrl: finalResumeUrl,
      status: 'Applied'
    });

    await application.save();

    // 5. Update user limits and job applicant counts
    await User.findByIdAndUpdate(seekerId, { $inc: { planApplicationsUsed: 1 } });
    await Job.findByIdAndUpdate(jobId, { $inc: { applicantsCount: 1 } });

    res.status(201).json({ message: 'Application submitted successfully.', application });
  } catch (error) {
    console.error('Error applying for job:', error);
    res.status(500).json({ message: 'Server error while submitting application.' });
  }
};

// @desc    Get all applications for the logged-in seeker
// @route   GET /api/applications/my-applications
// @access  Private (Seekers only)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ seekerId: req.user._id })
      .populate({
        path: 'jobId',
        select: 'title location salaryRange companyId status',
        populate: {
          path: 'companyId',
          select: 'name logoUrl industry'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching my applications:', error);
    res.status(500).json({ message: 'Server error while fetching your applications.' });
  }
};

// @desc    Get all applicants for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Recruiters only)
const getJobApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    // 1. Find the job and verify ownership
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found.' });
    }

    if (job.recruiterId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized. You do not have permission to view applicants for this job.' });
    }

    // 2. Fetch applications for this job
    const applications = await Application.find({ jobId })
      .populate('seekerId', 'name email skills avatar headline bio')
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching job applicants:', error);
    res.status(500).json({ message: 'Server error while fetching applicants.' });
  }
};

// @desc    Update application status
// @route   PATCH /api/applications/:id/status
// @access  Private (Recruiters only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    const validStatuses = ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Offered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    // Find the application and populate the associated job to check ownership
    const application = await Application.findById(applicationId).populate('jobId');
    if (!application) {
      return res.status(404).json({ message: 'Application not found.' });
    }

    if (!application.jobId) {
      return res.status(404).json({ message: 'Associated job no longer exists.' });
    }

    // Check if the logged-in recruiter owns the job associated with this application
    if (application.jobId.recruiterId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized. You cannot update the status of this application.' });
    }

    // Update status
    application.status = status;
    const updatedApplication = await application.save();

    // TODO: IN A PRODUCTION ENVIRONMENT, THIS SHOULD TRIGGER AN EMAIL NOTIFICATION TO THE SEEKER
    // e.g., sendEmail(application.seekerId.email, 'Your application status has been updated', `New status: ${status}`);

    res.status(200).json({ message: `Application status updated to ${status}.`, application: updatedApplication });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Server error while updating application status.' });
  }
};

module.exports = {
  applyForJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus
};
