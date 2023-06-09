const express = require('express');
const router = express.Router();
const userController = require('../controllers/User');
const passport = require('passport');
const ensureAuthenticated  = passport.authenticate('local')
// User routes
router.get('/users', ensureAuthenticated, userController.getAllUsers);
router.get('/users/:id', ensureAuthenticated, userController.getUserById);
router.put('/users/:id', ensureAuthenticated, userController.updateUser);
router.delete('/users/:id', ensureAuthenticated, userController.deleteUser);

module.exports = router;