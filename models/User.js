const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add any other fields specific to your user model
});

const User = mongoose.model('User', userSchema);

module.exports = User