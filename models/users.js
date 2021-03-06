var mongoose = require('mongoose');

var historyTickets = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
   });


var userSchema = mongoose.Schema({
    lastName : String,
    firstName: String,
    email: String,
    password: String,
    historyTickets : [historyTickets],
});
var userModel = mongoose.model('users', userSchema)

module.exports = userModel;