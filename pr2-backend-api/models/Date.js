const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
  bookedByGroup: String,
  startTime: [Number],
  message: String,
  roomNumber: String,
  verifyId: Number
});


const dateSchema = mongoose.Schema({
  date: {
    type: [Number],
    required: true
  },
  slots: {
    type: [slotSchema]
  },
  possibleSlots: {
    type: Number,
    max: 6
  },
  startTime: [Number]

});


module.exports = mongoose.model('Date', dateSchema);
