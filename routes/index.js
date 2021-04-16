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

//add to past journeys
router.get("/addtopastjourneys", async function (req, res, next) {
  console.log(req.session.user);
  // let curentUser = await userModel.find(req.session.user.id)

  res.render("/");
});

// route qui vérifie l'existence de ce voyage dans la BD
router.post("/journey", async function (req, res, next) {
  let askedDate = req.body.tripstart;

  let departureCity = req.body.citystart;
  let arrivalCity = req.body.cityarrive;
  let dateDeparture = req.body.tripstart;

  let userId = req.body.userId;

  let trainAvailable = await journeyModel.find({
    departure: displayCityName(departureCity),
    arrival: displayCityName(arrivalCity),
    date: dateDeparture,
  });

  req.session.journeyTab = [];

  if (trainAvailable != null) {
    res.render("ticketsavailable", {
      trainAvailable: trainAvailable,
      askedDate: askedDate,
      journeyTab: req.session.journeyTab,
      userId,
    });
  } else {
    res.redirect("/notrainavailable", {
      journeyTab: req.session.journeyTab,
      userId,
    });
  }
});

router.get("/notrainavailable", function (req, res, next) {
  res.render("notrainavailable");
});

router.get("/ticketsavailable", function (req, res, next) {
  res.render("ticketsavailable");
});

router.get("/basket", function (req, res, next) {
  console.log(
    "----------------------------------req.query-----------------------------",
    req.query
  );

  dataBasket.push({
    departure: req.query.departure,
    arrival: req.query.arrival,
    date: req.query.date,
    departureTime: req.query.departureTime,
    price: req.query.price,
  });

  console.log(dataBasket);
  res.render("basket", { dataBasket });
});

router.get("/mylasttrips", function (req, res, next) {
  res.render("mylasttrips");
});

router.get("/error", function (req, res, next) {
  res.render("error");
});

// Vous pouvez choisir de la garder ou la supprimer.
router.get("/result", function (req, res, next) {
  // Permet de savoir combien de trajets il y a par ville en base
  for (i = 0; i < city.length; i++) {
    journeyModel.find(
      { departure: city[i] }, //filtre

      function (err, journey) {
        console.log(
          `Nombre de trajets au départ de ${journey[0].departure} : `,
          journey.length
        );
      }
    );
  }

  res.render("index", { title: "Express" });
});

module.exports = router;
