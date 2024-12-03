const Calendar = require('../models/calendarModel');

exports.getCalendarItems = async (req, res) => {
  try {
    const calendar = await Calendar.findOne({ userId: req.params.userId });
    if (!calendar) return res.status(404).json({ message: 'No calendar items found' });

    res.status(200).json(calendar.calendarItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addCalendarItem = async (req, res) => {
  try {
    const { title, date, description } = req.body;
    const userId = req.params.userId;

    let calendar = await Calendar.findOne({ userId });

    if (!calendar) {
      // Creating a new calendar for that userID
      calendar = new Calendar({ userId, calendarItems: [] });
    }

    calendar.calendarItems.push({ title, date, description });
    await calendar.save();

    res.status(201).json(calendar.calendarItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCalendarItem = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Calendar.updateOne(
      {},
      { $pull: { calendarItems: { _id: id } } }
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
