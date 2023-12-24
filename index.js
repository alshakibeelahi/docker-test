const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://mongo:27017/signupDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema
const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
});

// Create a model
const User = mongoose.model('User', userSchema);

// Routes
app.post('/sign-up', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(200).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/sign-in', async (req, res) => {
  const { name, password } = req.body;

  try {
    const newUser = await User.findOne({ name, password });
    if(!newUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    else{
      return res.status(200).json({ message: 'User found', user: newUser });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route................' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
