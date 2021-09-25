const express = require('express');
const router = express.Router();

const patients = require("../controllers/patient.controller.js");

// Create a new Patient
router.post("/patients", patients.create);

// Retrieve all Patients
router.get("/patients", patients.findAll);

// Retrieve a single Patient with username
router.get("/patients/findPatient", patients.findOne);

// Retrieve a single Patient with the correct combination username and password
router.post("/patients/verifyPatient", patients.verifyPatient);

module.exports = router;