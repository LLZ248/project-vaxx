const express = require('express');
const router = express.Router();

const vaccinations = require("../controllers/vaccination.controller.js");

//   // Create a new Vaccination
//   app.post("/vaccinations", vaccinations.create);

// Retrieve all Vaccination
router.get("/vaccinations", vaccinations.findAll);

// Retrieve a single Vaccination with vaccinationID
router.get("/vaccinations/:vaccinationID", vaccinations.findOne);

module.exports = router;