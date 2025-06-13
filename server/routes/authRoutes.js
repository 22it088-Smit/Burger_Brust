const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route POST /api/auth/register
// @desc Register new user
// @access Public
router.post('/register', authController.registerUser);

// @route POST /api/auth/login
// @desc Authenticate user & get token
// @access Public
router.post('/login', authController.loginUser);

// @route GET /api/auth/logout
// @desc Logout user (client-side)
// @access Public (or Private if using server-side sessions)
router.get('/logout', authController.logoutUser);

module.exports = router; 