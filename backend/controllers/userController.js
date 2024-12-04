// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation
    if (!email || !password) {
      return res.status(400).json({ status: 'error', error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: 'error', error: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ status: 'ok', message: 'User registered successfully' });
  } catch (err) {
    console.error('Error during registration:', err);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
          .status(404)
          .json({ status: 'error', error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
          .status(401)
          .json({ status: 'error', error: 'Invalid password' });
    }

    const JWT_SECRET = '0efef09cf94b096af52768c87b11084f7f97815a0b4939ef12c046fb0448adce3bb130d0d0c1103c804eacfef40f539bd55a1e9fc795c19e482d2fc04f105d17';
    // Generate a JWT token
    const token = jwt.sign(
        { email: user.email, id: user._id },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ status: 'ok', token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ status: 'error', error: 'Login failed' });
  }
};
