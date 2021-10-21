const express = require('express');
const router = express.Router();

const vaccines = require("../controllers/vaccine.controller.js");


// Retrieve all Vaccination
router.get("/vaccines", vaccines.findAll);

// Retrieve a single Vaccination with batchNo
router.get("/vaccines/:vaccineID", vaccines.findOne);

// Retrieve all Vaccination
router.get("/available-vaccines", vaccines.findAvailable);


module.exports = router;