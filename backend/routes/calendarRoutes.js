// const express = require('express');
// const { getCalendarItems, addCalendarItem, deleteCalendarItem } = require('../controllers/calendarController');
// const router = express.Router();

// router.get('/:userId', getCalendarItems);       // Get calendar items for a user
// router.post('/:userId', addCalendarItem);       // Add a calendar event for a user
// router.delete('/:id', deleteCalendarItem);      // Delete a calendar event

// module.exports = router;

// const express = require('express');
// const { getEvents, createEvent, deleteEvent } = require('../controllers/calendarController');

// const router = express.Router();

// router.get('/', getEvents); // Get all events
// router.post('/', createEvent); // Create a new event
// router.delete('/:id', deleteEvent); // Delete an event by ID

// module.exports = router;


const express = require('express');
const router = express.Router();
const Event = require('../models/calendarModel.js');

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new event
router.post('/', async (req, res) => {
  const event = new Event({
    name: req.body.name,
    date: req.body.date,
  });
  try {
    const newEvent = await event.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH (update) a event
router.patch('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (req.body.name) event.name = req.body.name;
    if (req.body.date) event.date = req.body.date;
    if (req.body.category) event.category = req.body.category;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE an event
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
