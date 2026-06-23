const User = require('../models/User');

/**
 * @desc    Get logged in user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
  try {
    // req.user is set by the verifyToken middleware.
    // Fetch the user from the database to ensure data is up to date,
    // and explicitly exclude the password field.
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error while fetching profile' });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update common fields
    user.name = req.body.name !== undefined ? req.body.name : user.name;
    user.avatar = req.body.avatar !== undefined ? req.body.avatar : user.avatar;

    // Update role-specific fields for 'Seeker'
    if (user.role === 'Seeker') {
      user.headline = req.body.headline !== undefined ? req.body.headline : user.headline;
      user.bio = req.body.bio !== undefined ? req.body.bio : user.bio;
      user.resumeUrl = req.body.resumeUrl !== undefined ? req.body.resumeUrl : user.resumeUrl;
      
      // Parse skills into an array of strings
      if (req.body.skills !== undefined) {
        if (Array.isArray(req.body.skills)) {
          user.skills = req.body.skills;
        } else if (typeof req.body.skills === 'string') {
          user.skills = req.body.skills
            .split(',')
            .map(skill => skill.trim())
            .filter(skill => skill !== ''); // remove empty strings
        }
      }
    }

    // Save changes to DB. This triggers any Mongoose validators.
    const updatedUser = await user.save();
    
    // Remove the password field from the response object
    const userResponse = updatedUser.toObject();
    delete userResponse.password;

    res.status(200).json({
      message: 'Profile updated successfully',
      user: userResponse
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile
};
