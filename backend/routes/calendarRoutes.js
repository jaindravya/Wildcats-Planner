const express = require('express');
const { getEvents, addEvent } = require('../controllers/calendarController');
const router = express.Router();

router.get('/', getEvents);
router.post('/', addEvent);

module.exports = router;