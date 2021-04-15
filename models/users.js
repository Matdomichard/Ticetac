var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    lastName : String,
    firstName: String,
    email: String,
    password: String,
    journeys: [messageSchema],
      })

var userModel = mongoose.model('users', userSchema)