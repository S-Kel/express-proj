const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { userSchema } = require('./User')

// Create User schema
const hostSchema = new Schema({
    user: {
        type: userSchema, // Each host is a user, but a user does not have to be a host; One to one relationship
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    organisation: {
        type: String,
        required: true
    },
    socials: [String]
}, { timestamps: true });

// Create Host model
const Host = mongoose.model('Host', hostSchema);

// Export Host schema & model 
module.exports = { hostSchema, Host };