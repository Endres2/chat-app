const bcrypt = require('bcryptjs');
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
    //Creates session for the user
    await req.logIn(newUser, (err) => {
        if (err) {
          console.error('Error logging in user:', err);
          return res.status(500).json({ error: 'Login failed. Please try again later.' });
        }
  
        // Redirect or send a success response
        res.status(200).json({ message: 'Registration and login successful' });
      })} catch (error) {
    // Handle any errors
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login an existing user
const login = async (req, res) => {
  console.log(req.body)
  //if(req.body.id === undefined) {return}
  const { username, password } = req.body;

  try {
    // Find the user by their username
    const user = await User.findOne({ username });

    // If user not found or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }else{
        await req.login(user, (err) => {
            if (err) {
              console.error('Error logging in user:', err);
              return res.status(500).json({ error: 'Login failed. Please try again later.' });
            }});
            return res.json({ message: 'Login successful' });
    }

    // Return the token in the response
    
    //return res.json({ message: 'Login successful' });
  } catch (error) {
    // Handle any errors
    //return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Logout the current user
const logout = async (req, res) => {
  // Perform any logout-related tasks (e.g., clearing session data)
  req.logout((err) => {
    if (err) {
      console.log(err)
    } else {
      req.session.destroy();
      //res.json({ message: 'Logout successful' });
      res.redirect("/")
    }
  });
  // Return a success response
  
};

module.exports = {
  register,
  login,
  logout,
};