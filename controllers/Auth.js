const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne().or([{ username }, { email }]);

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return a success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login an existing user
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    // If user not found or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token with the user's ID as the payload
    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token in the response
    res.json({ message: 'Login successful', token });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Logout the current user
const logout = async (req, res) => {
  // Perform any logout-related tasks (e.g., clearing session data)

  // Return a success response
  res.json({ message: 'Logout successful' });
};

module.exports = {
  register,
  login,
  logout,
};