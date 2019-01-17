const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create new User schema
const User = new Schema({});

const passportLocalMongoose = require('passport-local-mongoose');

// Plugin the local authentication strategy using mongoose to store user profiles. 
// User's email will be used as the username
User.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

// Create and export new User model module
module.exports = mongoose.model('User', User);