const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Event Schema
const Event = new Schema({
    description: 'string'
});


// Create and export Event model
module.exports = mongoose.model('Event', Event);