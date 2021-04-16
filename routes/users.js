var express = require('express');
var router = express.Router();
var userModel = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



// l'user se connecte a son compte
router.post('/signintohomepage', async function(req, res, next) {
  var user = await userModel.find( {email:req.body.email,password:req.body.password})
  if(user.length > 0){
    req.session.user = user[0]
    res.render('homepage',{user:req.session.user });
 }else {
  res.render('login',{alertMessage:'You need to sign-up first'},);
 }  
 });

// l'user s'inscrit
router.post('/signuptohomepage', async function(req, res, next) {

  var newUser = new userModel({
    lastName : req.body.firstname,
    firstName: req.body.lastname,
    email:  req.body.emailAddress,
    password: req.body.password
  })
 await newUser.save();
  req.session.user = newUser;

  res.render('homepage', {user: req.session.user})
});



module.exports = router;
