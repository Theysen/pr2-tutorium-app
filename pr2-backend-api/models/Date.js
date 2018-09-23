const mongoose = require('mongoose');
//
// const dateSchema = mongoose.Schema({
//     day: Number,
//     month: Number,
//     year: Number,
//     bookedByGroup: [String],
//     subject: String,
//     bookedSlots: {
//         type: Number,
//         max: 6
//     },
//     possibleSlots: Number,
//     startTime: String,
//     endTime: String,
//     tutor: String,
//     date: {type: Date, default: Date.now}
// });


const dateSchema = mongoose.Schema({
  date: {
    type: [Number],
    required: true
  },
  slots: [{
    bookedByGroup: String,
    startTime: [Number],
    message: String,
    roomNumber: String,
    verifyId: Number
  }],
  possibleSlots: {
    type: Number,
    max: 6
  },
  startTime: [Number],
  endTime: [Number],

});


module.exports = mongoose.model('Date', dateSchema);
