const admin = require('../config/firebase');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify Firebase token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    if (!decodedToken || !decodedToken.email) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token payload' });
    }

    // Attach decoded token for further usage if needed (e.g., syncUser)
    req.firebaseUser = decodedToken;

    // Fetch user from MongoDB
    const user = await User.findOne({ email: decodedToken.email });
    
    // Attach user to request object (will be null if user doesn't exist yet)
    req.user = user;
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid or expired token' });
  }
};

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // If the user hasn't been synced to MongoDB yet or they don't have a role
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: 'Forbidden: User not found or role not assigned' });
    }

    // Check if the user's role is in the list of allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

module.exports = {
  verifyToken,
  checkRole,
};
