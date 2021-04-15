var express = require('express');
var router = express.Router();
var userModel = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var searchUser = await userModel.findOne({email:req.body.email})

router.post('/signup', async function(req, res, next) {

if(searchUser == null){
  var newUser = new userModel({
    lastName : req.body.firstname,
    firstName: req.body.lastname,
    email:  req.body.emailAddress,
    password: req.body.password
  })
  var userSaved = await newUser.save();
  res.redirect('/homepage')
}

else {
  res.render('login');
  } 
});




module.exports = router;
