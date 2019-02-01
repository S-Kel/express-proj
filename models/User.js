const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create User schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'guest'
    }
}, { timestamps: true });

const passportLocalMongoose = require('passport-local-mongoose');

// Plugin the local authentication strategy using mongoose to store user profiles. 
// User's email will be used as the username
userSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

// Create User model
const User = mongoose.model('User', userSchema);

// Export User schema & model 
module.exports = { userSchema, User };