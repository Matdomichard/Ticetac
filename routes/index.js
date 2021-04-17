var express = require("express");
var router = express.Router();
var journeyModel = require("../models/journeys");

const mongoose = require("mongoose");
const userModel = require("../models/users");

var displayCityName = function (cityName) {
  return cityName.charAt(0).toUpperCase() + cityName.slice(1);
};

var dataBasket = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  if (req.session.user == undefined) {
    req.session.user = [];
  }
  res.render("login", { title: "Express" });
});

router.get("/homepage", function (req, res, next) {
  if (req.session.user == undefined) {
    req.session.user = [];
  }
  res.render("homepage");
});

// route qui vérifie l'existence de ce voyage dans la BD
router.post("/journey", async function (req, res, next) {
  let departureCity = req.body.citystart;
  let arrivalCity = req.body.cityarrive;
  let dateDeparture = req.body.tripstart;

  let userId = req.body.userId;

  var journey = await journeyModel.find({
    departure: departureCity,
    arrival: arrivalCity,
    date: dateDeparture,
  });

  req.session.journeyTab = [];

  if (journey[0] == undefined) {
    res.render("ticketsavailable", {
      journeyTab: req.session.journeyTab,
      userId,
    });
  } else {
    for (var i = 0; i < journey.length; i++) {
      req.session.journeyTab.push(journey[i]);
      // console.log('req session lookout -->',req.session)
    }
    res.render("ticketsavailable", {
      journeyTab: req.session.journeyTab,
      userId,
    });
  }
});

router.get("/ticketsavailable", function (req, res, next) {
  res.render("ticketsavailable");
});

router.post("/basket", async function (req, res, next) {
  if (req.session.myTickets == undefined) {
    req.session.myTickets = [];
  }
  req.session.myTickets.push(req.body);

  for (var i = 0; i < req.session.myTickets.length; i++) {
    req.session.myTickets[i].ticketPrice = Number(
      req.session.myTickets[i].ticketPrice
    );
  }
  console.log(req.session)
  res.redirect("/basket");
});

router.get("/basket", async function (req, res, next) {
  res.render("basket", { myTickets: req.session.myTickets });
});


/* Derniere etape avant myLastTrips */
router.get("/confirmReservation", async function (req, res, next) {
  //console.log('/confirmReservation : We have this user in session --> :', req.session.user)
  console.log(req.session);
  // We want to update our onGoingTicket for our user
  var user = await userModel.findById(req.session.user._id);

  //console.log(' /confirmReservation : we found the user --->',user);
  //console.log(' /confirmReservation : session --->',req.session.myTickets);

  for (i = 0; i < req.session.myTickets.length; i++) {
    user.historyTickets.push({
      departure: req.session.myTickets[i].ticketDeparture,
      arrival: req.session.myTickets[i].ticketArrival,
      date: req.session.myTickets[i].ticketDate,
      departureTime: req.session.myTickets[i].ticketDepartureTime,
      price: req.session.myTickets[i].ticketPrice,
    });
  }

  await user.save();

  req.session.myTickets = [];

  res.render("homepage", { user: req.session.user });
});

/* Last trips page. */
router.get("/myLastTrips", async function (req, res, next) {
  var historicTravel = [];

  var user = await userModel.findById(req.session.user._id);

  //console.log("On a bien le user suivant dans myLastTrips -->",user.historyTickets);
  res.render("mylasttrips", {
    title: "Express",
    historicTravel: user.historyTickets,
  });
});
router.get("/error", function (req, res, next) {
  res.render("error");
});

module.exports = router;
