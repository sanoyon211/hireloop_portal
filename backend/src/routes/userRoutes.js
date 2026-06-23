const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Apply the verifyToken middleware to all routes in this file
// ensuring only authenticated users can access them
router.use(verifyToken);

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile);

module.exports = router;
