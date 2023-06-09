const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import your User model or user authentication logic
const User = require('../models/User');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

// Serialize the user object to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize the user object from the stored session
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
      done(null, user)
    })
    .catch((err) => done('pass'));
});



module.exports = passport;