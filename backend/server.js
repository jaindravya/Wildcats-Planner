require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const connectToDB = require('./db');

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');
const calendarRoutes = require('./routes/calendarRoutes');

const app = express();
const port = process.env.PORT || 5001;

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from React frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed methods
  credentials: true, // Allow credentials like cookies
}));

// Middleware
app.use(express.json()); // Built-in JSON body parser

// Routes
app.use('/users', userRoutes);
app.use('/tasks', todoRoutes);
app.use('/calendar', calendarRoutes);

// Start the server
connectToDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
