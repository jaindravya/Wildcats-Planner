const CalendarEvent = require('../models/calendarModel');

exports.getEvents = async (req, res) => {
  const events = await CalendarEvent.find();
  res.json(events);
};

exports.addEvent = async (req, res) => {
  const newEvent = new CalendarEvent(req.body);
  const savedEvent = await newEvent.save();
  res.json(savedEvent);
};

// need to add other methods
