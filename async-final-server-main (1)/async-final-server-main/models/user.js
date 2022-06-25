const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//New schema for user.
const User = new Schema({
    firstName: String,
    lastName: String,
    birthday: Date,
    marital_status: Boolean
});

// Adding passport-local plugin to user schema.
User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",User);