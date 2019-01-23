const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { userSchema } = require('./User')

// Create Event Schema
const Event = new Schema({
    host: {
        type: userSchema, // each event belongs to a host; a host could have multiple events
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: 5000
    },
    volunteers: {
        type: Boolean,
        required: true
    },
    target_value: {
        type: String,  //this will be stored as a range e.g. $100 - 200K
        required: true
    },
    location: {
        type: [String],
        required: true
    },
    best_time: {
        type: String,  // this could be a date or description of the best time for a WBGS event in the hosts community
        required: true
    },
    local_council_relationship: Boolean,
    local_council_details: String,
    key_influencers: [String]
});

// Create and export Event model
module.exports = mongoose.model('Event', Event);