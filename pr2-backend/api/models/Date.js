const mongoose = require('mongoose');

const dateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    day: String,
    month: String,
    year: String,
    bookedByGroup: String,
    date: {type: Date, default: Date.now}
  })
;

module.exports = mongoose.model('Date', dateSchema);
