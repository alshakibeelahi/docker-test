const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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
app.post('/signup', async (req, res) => {
  const { name, phoneNumber, email } = req.body;

  try {
    const newUser = new User({ name, phoneNumber, email });
    await newUser.save();

    res.status(200).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route................' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
