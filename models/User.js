const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const User = new Schema({});

const passportLocalMongoose = require('passport-local-mongoose');

// Plugin the local authentication strategy using mongoose to store user profiles. 
// User's email will be used as the username
User.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

// Create and export User model module
module.exports = mongoose.model('User', User);