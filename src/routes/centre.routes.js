const express = require('express');
const router = express.Router();

const centres = require("../controllers/centre.controller.js");

// Create a new Healthcare Centre
router.post("/healthcare-centre", centres.create);

// Retrieve all Healthcare Centres
router.get("/healthcare-centre", centres.findAll);

// Retrieve a single Healthcare Centre with username
router.get("/healthcare-centre/findCentre", centres.findOne);

module.exports = router;