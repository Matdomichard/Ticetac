var express = require('express');
var router = express.Router();
var userModel = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/signup', async function(req, res, next) {

  var newUser = new userModel({
    lastName : req.body.firstname,
    firstName: req.body.lastname,
    email:  req.body.emailAddress,
    password: req.body.password
  })
  var userSaved = await newUser.save();
  req.session.user = {email: userSaved.email, id: userSaved._id};
  console.log(req.session.user)

  res.render('homepage')
});

router.post('/signintohomepage', async function(req, res, next) {
  var searchUser = await userModel.findOne(
 {email:req.body.email,
 password:req.body.password
 }
 )

 if(searchUser == null) {
  res.redirect('/');
 }else {
  req.session.user = {email: searchUser.email, id: searchUser._id};
  res.render('homepage');
 }  
 });


module.exports = router;
