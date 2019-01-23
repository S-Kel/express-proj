const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const userSchema = new Schema({
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
    // email will be added by passport plugin
    socials: [String]
});

const passportLocalMongoose = require('passport-local-mongoose');

// Plugin the local authentication strategy using mongoose to store user profiles. 
// User's email will be used as the username
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

// Create user model
const User = mongoose.model('User', userSchema);

// Export User schema & model 
module.exports = { userSchema, User };