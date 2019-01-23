const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { userSchema } = require('./User')

// Create Event Schema
const Event = new Schema({
    host: userSchema, // each event belongs to a host; a host could have multiple events
    description: String,
    volunteers: Boolean,
    target_value: String, //this will be stored as a range e.g. $100 - 200K
    location: [String],
    best_time: String, // this could be a date or description of the best time for a WBGS event in the hosts community
    local_council_relationship: Boolean,
    local_council_details: String,
    key_influencers: [String]
});

// Create and export Event model
module.exports = mongoose.model('Event', Event);