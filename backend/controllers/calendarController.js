// const Calendar = require('../models/calendarModel');

// exports.getCalendarItems = async (req, res) => {
//   try {
//     const calendar = await Calendar.findOne({ userId: req.params.userId });
//     if (!calendar) return res.status(404).json({ message: 'No calendar items found' });

//     res.status(200).json(calendar.calendarItems);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.addCalendarItem = async (req, res) => {
//   try {
//     const { title, date, description } = req.body;
//     const userId = req.params.userId;

//     let calendar = await Calendar.findOne({ userId });

//     if (!calendar) {
//       // Creating a new calendar for that userID
//       calendar = new Calendar({ userId, calendarItems: [] });
//     }

//     calendar.calendarItems.push({ title, date, description });
//     await calendar.save();

//     res.status(201).json(calendar.calendarItems);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteCalendarItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const result = await Calendar.updateOne(
//       {},
//       { $pull: { calendarItems: { _id: id } } }
//     );

//     res.status(200).json(result);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

const Event = require('../models/calendarModel');

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find(); // Fetch all events
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date } = req.body;
        const newEvent = new Event({ title, description, date });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: 'Error creating event', error });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findByIdAndDelete(id); // Delete event by ID
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting event', error });
    }
};

