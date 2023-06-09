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

// Example protected route
router.get('/protected', passport.authenticate('local'), (req,res)=>{
    if (req.isAuthenticated()) {
        if(!err){
            res.send("Allowed access")
        }else{
            console.log(err);
            res.sendStatus(500);
            return;
        }
      }else{
        res.send("Access denied")
      }
    
});

module.exports = router;