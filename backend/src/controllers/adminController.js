const User = require('../models/User');
const Company = require('../models/Company');
const Job = require('../models/Job');
const Payment = require('../models/Payment');

// @desc    Get dashboard statistics for admin
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRecruiters = await User.countDocuments({ role: 'Recruiter' });
    const totalCompanies = await Company.countDocuments();
    const totalJobsPosted = await Job.countDocuments();

    // Calculate Platform Revenue
    const revenueAgg = await Payment.aggregate([
      { $match: { status: 'Success' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const platformRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    // Breakdown of job posts per category (for Recharts)
    const jobsPerCategory = await Job.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { _id: 0, category: '$_id', count: 1 } }
    ]);

    // New user registrations over the past 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const userRegistrations30Days = await User.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          // Extract the YYYY-MM-DD from the createdAt date
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: '$_id', count: 1 } }
    ]);

    res.status(200).json({
      totalUsers,
      totalRecruiters,
      totalCompanies,
      totalJobsPosted,
      platformRevenue,
      jobsPerCategory,
      userRegistrations30Days
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard stats.' });
  }
};

// @desc    Get all users with filtering and search
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getAllUsers = async (req, res) => {
  try {
    const { email, role } = req.query;
    let query = {};

    if (email) {
      // Case-insensitive regex search by email
      query.email = { $regex: email, $options: 'i' };
    }
    if (role) {
      query.role = role;
    }

    const users = await User.find(query).select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users.' });
  }
};

// @desc    Update a user's role
// @route   PATCH /api/admin/users/:id/role
// @access  Private (Admin only)
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;

    if (!['Seeker', 'Recruiter', 'Admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role provided.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Prevent modifying another Admin's role (or accidentally degrading own role)
    if (user.role === 'Admin') {
      return res.status(403).json({ message: 'Modifying an Admin account role is prohibited.' });
    }

    user.role = role;
    const updatedUser = await user.save();

    res.status(200).json({ message: `User role successfully updated to ${role}.`, user: updatedUser });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server error while updating user role.' });
  }
};

// @desc    Toggle user status (suspend/activate)
// @route   PATCH /api/admin/users/:id/status
// @access  Private (Admin only)
const toggleUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body; // Expected to be a boolean
    const userId = req.params.id;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({ message: 'isActive must be a boolean value.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Admins cannot be suspended through this standard endpoint
    if (user.role === 'Admin') {
      return res.status(403).json({ message: 'Suspending an Admin account is prohibited.' });
    }

    user.isActive = isActive;
    const updatedUser = await user.save();

    const statusMsg = isActive ? 'activated' : 'suspended';
    res.status(200).json({ message: `User account has been ${statusMsg}.`, user: updatedUser });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).json({ message: 'Server error while toggling user status.' });
  }
};

// @desc    Get all payments and summary calculations
// @route   GET /api/admin/payments
// @access  Private (Admin only)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 });

    // Calculate Summaries in-memory
    let totalRevenue = 0;
    let monthlyRevenue = 0;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    payments.forEach((payment) => {
      if (payment.status === 'Success') {
        totalRevenue += payment.amount;
        
        const paymentDate = new Date(payment.createdAt);
        if (paymentDate.getMonth() === currentMonth && paymentDate.getFullYear() === currentYear) {
          monthlyRevenue += payment.amount;
        }
      }
    });

    // Calculate Active Subscriptions
    const activeSeekerSubs = await User.countDocuments({ role: 'Seeker', currentPlan: { $ne: 'Free' } });
    const activeRecruiterSubs = await User.countDocuments({ role: 'Recruiter', currentPlan: { $ne: 'Free' } });

    res.status(200).json({
      payments,
      summary: {
        totalRevenue,
        monthlyRevenue,
        activeSeekerSubs,
        activeRecruiterSubs
      }
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({ message: 'Server error while fetching payments.' });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  updateUserRole,
  toggleUserStatus,
  getAllPayments
};
