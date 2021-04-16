var express = require('express');
var router = express.Router();
var journeyModel = require('../models/journeys')

const mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('homepage');
});

// route qui vérifie l'existence de ce voyage dans la BD
router.post('/journey', async function(req, res, next) {
let askedDate = req.body.tripstart
let trainAvailable = await journeyModel.find({ departure: req.body.citystart , arrival:req.body.cityarrive, date: req.body.tripstart});
  if(trainAvailable != null){
    res.render('ticketsavailable', {trainAvailable: trainAvailable, askedDate: askedDate});
   }else {
   res.redirect('/notrainavailable');
   }  
});


router.get('/notrainavailable', function(req, res, next) {
  res.render('notrainavailable');
});


router.get('/ticketsavailable', function(req, res, next) {

  res.render('ticketsavailable');
});

router.get('/basket', function(req, res, next) {

  res.render('basket');
});

router.get('/mylasttrips', function(req, res, next) {

  res.render('mylasttrips');
});


router.get('/error', function(req, res, next) {
  res.render('error');
});


// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});

module.exports = router;
