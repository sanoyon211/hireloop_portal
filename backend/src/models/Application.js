const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID is required'],
      index: true,
    },
    seekerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Seeker ID is required'],
      index: true,
    },
    resumeUrl: {
      type: String,
      required: [true, 'Resume URL snapshot is required'],
    },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Rejected', 'Offered'],
      default: 'Applied',
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate applications for the same job from the same user
applicationSchema.index({ jobId: 1, seekerId: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
