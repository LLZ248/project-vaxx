const express = require('express');
const router = express.Router();

const batches = require("../controllers/batch.controller.js");

// Create a new Vaccination
router.post("/batches", batches.create);

// Retrieve all Vaccination
router.get("/batches", batches.findAll);

// Retrieve a single Vaccination with batchNo
router.get("/batches/:batchNo", batches.findOne);

// Update a Vaccination with batchNo
router.put("/batches/:batchNo", batches.update);

module.exports = router;