const Batch = require("../models/batch.model.js");

// Create and Save a new Patient
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // parsedDate = new Date(req.body.expiryDate)
  //   .toISOString()
  //   .slice(0, 10)
  //   .replace('T', ' '); //convert to mysql format

  // Create a Batch
  const batch = new Batch({
    batchNo: req.body.batchNo,
    expiryDate: req.body.expiryDate,
    quantityAvailable: req.body.quantityAvailable,
    quantityAdministered: 0,
    vaccineID: req.body.vaccineID,
    centreName: req.body.centreName
  });

  // Save Batch in the database
  Batch.create(batch, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Batch.",
      });
    else res.send(data);
  });
}

// Retrieve all Batches from the database.
exports.findAll = (req, res) => {
  Batch.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Batch.",
      });
    else res.send(data);
  });
}

// Retrieve one Batch from the database based on batchNo.
exports.findOne = (req, res) => {
  Batch.findById(req.params.batchNo, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Batch with batchNo ${req.params.batchNo}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Batch with batchNo " +
            req.params.batchNo,
        });
      }
    } else res.send(data);
  });
}

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Batch.updateById(
    req.params.batchNo,
    new Batch(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Batch with batchNo ${req.params.batchNo}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Batch with batchNo " +
              req.params.batchNo,
          });
        }
      } else res.send(data);
    }
  );
};

exports.viewByCenter = (req, res) => {

  if(!req.params.centreName) {
    res.status(400).send({
      message:
        "Centre name not found in the request" //bad request
    });
    return;
  }

  Batch.viewByCenter(req.params.centreName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Batch with centreName ${req.params.centreName}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Batch with centreName " +
            req.params.centreName
        });
      }
    } else res.send(data);
  });
}
