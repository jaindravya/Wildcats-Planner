// const mongoose = require('mongoose');

// const calendarSchema = new mongoose.Schema({
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     calendarItems: [
//       {
//         title: { type: String, required: true },
//         date: { type: Date, required: true },
//         description: { type: String },
//       },
//     ],
//   });
  

// module.exports = mongoose.model('CalendarEvent', calendarSchema);


const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    category: {type: String, default: 'Personal'},

});

module.exports = mongoose.model('Event', EventSchema);
