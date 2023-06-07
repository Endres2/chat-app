const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('./config/passport');
const routes = require('./routes');

// Create the Express app
const app = express();

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
app.use('/api', routes);
//app.use(require("./routes/record"));

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