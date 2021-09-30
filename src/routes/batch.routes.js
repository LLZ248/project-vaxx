const express = require('express');
const router = express.Router();

const batches = require("../controllers/batch.controller.js");

// Create a new Batch
router.post("/batches", batches.create);

// Retrieve all Batch
router.get("/batches", batches.findAll);

// Retrieve a single Batch with batchNo
router.get("/batches/:batchNo", batches.findOne);

// Update a Batch with batchNo
router.put("/batches/:batchNo", batches.update);

// router.get("/batches/:batchNo/vaccinations", batches.findAllVaccinations);


module.exports = router;