var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    lastName : String,
    firstName: String,
    email: String,
    password: String,
    // pastJourneys: [{type: mongoose.Schema.Types.ObjectId, ref: 'orders'}],
});
var userModel = mongoose.model('users', userSchema)

module.exports = userModel;