const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./config/passport');
const routes = require('./routes');
const path = require('path');

// Create the Express app
const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
    })
  );
app.use(passport, passport.initialize())
app.use(passport.session())
  



app.use('/api', routes);
//app.use(require("./routes/record"));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public', 'index.html'));
  });
// Get MongoDB driver connection
const connectDB = require("./config/conn");
 
connectDB()
  .then(() => {
    // Start your server
    app.listen(port, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });