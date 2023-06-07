const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
require("dotenv").config({ path: "./config.env" });

// Configure Passport JWT strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

// JWT strategy
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    // Find the user by the provided user ID in the JWT payload
    const user = await User.findById(payload.userId);

    // If user not found
    if (!user) {
      return done(null, false);
    }

    // User found, attach the user object to the request
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

// Initialize Passport and use the JWT strategy
passport.use(jwtStrategy);

module.exports = passport;