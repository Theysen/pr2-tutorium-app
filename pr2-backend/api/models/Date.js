const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  day: Number,
  month: Number,
  year: Number,
  bookedByGroup: String,
  subject: String,
  date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Date', dateSchema);
