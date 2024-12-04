// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register); // Register a new user
router.post('/login', userController.login);       // Log in an existing user

module.exports = router;
