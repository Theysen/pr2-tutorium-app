const mongoose = require('mongoose');

const slotIndex = mongoose.Schema({
    index: Number
});

module.exports = mongoose.model('SlotIndex', slotIndex);