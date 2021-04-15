var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    lastName : String,
    firstName: String,
    email: String,
    password: String,
    // journeys: [journeysSchema],
      })

var userModel = mongoose.model('users', userSchema)