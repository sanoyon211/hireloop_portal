const User = require('../models/User');

const syncUser = async (req, res) => {
  try {
    const firebaseUser = req.firebaseUser;
    
    if (!firebaseUser) {
      return res.status(401).json({ message: 'Unauthorized: No Firebase user data found' });
    }

    // Check if the user already exists in DB (retrieved in verifyToken middleware)
    let user = req.user;

    if (!user) {
      // User doesn't exist in MongoDB, create a new one
      // Name, avatar, and role can be passed in req.body from the frontend during sign up
      const { name, role, avatar } = req.body;
      
      user = new User({
        email: firebaseUser.email,
        name: name || firebaseUser.name || 'Anonymous User',
        avatar: avatar || firebaseUser.picture || '',
        role: role || 'Seeker', // Defaulting to Seeker if not provided
        password: 'Firebase-managed-password', // Placeholder to satisfy Mongoose validation
      });

      await user.save();
      return res.status(201).json({ message: 'User created and synced successfully', user });
    }

    return res.status(200).json({ message: 'User already synced', user });
  } catch (error) {
    console.error('Error syncing user:', error);
    return res.status(500).json({ message: 'Internal server error during sync' });
  }
};

module.exports = {
  syncUser,
};
