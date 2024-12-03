const express = require('express');
const { getCalendarItems, addCalendarItem, deleteCalendarItem } = require('../controllers/calendarController');
const router = express.Router();

router.get('/:userId', getCalendarItems);       // Get calendar items for a user
router.post('/:userId', addCalendarItem);       // Add a calendar event for a user
router.delete('/:id', deleteCalendarItem);      // Delete a calendar event

module.exports = router;