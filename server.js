const express = require("express");

const app = express();

const cors = require("cors");



require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

//app.use(require("./routes/record"));

// Get MongoDB driver connection
const connectDB = require("./config/conn");
 
connectDB()
  .then(() => {
    // Start your server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });