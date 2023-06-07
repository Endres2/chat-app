const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth');

// Register a new user
router.post('/register', authController.register);

// Login an existing user
router.post('/login', authController.login);

// Logout the current user
router.post('/logout', authController.logout);

// // Example protected route
// router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
//   // Access the authenticated user through req.user
//   res.json({ message: 'Protected route accessed successfully', user: req.user });
// });

module.exports = router;