const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      index: true, // Optimizes email-based lookups
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    avatar: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['Seeker', 'Recruiter', 'Admin'],
      required: [true, 'Role is required'],
      index: true, // Optimizes role-based filtering
    },
    // Seeker Profile Fields
    headline: {
      type: String,
      trim: true,
      default: '',
    },
    bio: {
      type: String,
      trim: true,
      default: '',
    },
    skills: {
      type: [String],
      default: [],
    },
    resumeUrl: {
      type: String,
      default: '',
    },
    // Subscription Info
    currentPlan: {
      type: String,
      enum: ['Free', 'Pro', 'Premium', 'Growth', 'Enterprise'],
      default: 'Free',
    },
    planApplicationsUsed: {
      type: Number,
      default: 0,
    },
    activeJobsCount: {
      type: Number,
      default: 0,
    },
    // Admin Controls
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Additional composite indexes can be added if needed, e.g., for analytics
// userSchema.index({ role: 1, currentPlan: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
