const express = require('express');
const router = express.Router();

const vaccinations = require("../controllers/vaccination.controller.js");

//Create a new Vaccination
router.post("/vaccinations", vaccinations.create);

// Retrieve all Vaccination
router.get("/vaccinations", vaccinations.findAll);

// Retrieve a single Vaccination with vaccinationID
router.get("/vaccinations/:vaccinationID", vaccinations.findOne);

// Retrieve all Vaccinations with specificed batchNo
router.get("/vaccinations/ofBatch/:batchNo", vaccinations.findByBatch);


module.exports = router;