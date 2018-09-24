const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
  date: {
    type: [Number],
    required: true
  },
  slots: {
    type: [{
      bookedByGroup: String,
      startTime: [Number],
      message: String,
      roomNumber: String,
      verifyId: Number
    }],
    required: false
  },
  possibleSlots: Number,
  startTime: [Number]

});


module.exports = mongoose.model('Date', dateSchema);
