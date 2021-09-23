import Batch from "../models/batch.model.js";

// Create and Save a new Patient
export const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Batch
  const batch = new Batch({
    batchNo: req.body.batchNo,
    expiryDate: req.body.batchNo,
    quantityAvailble: req.body.quantityAvailble,
    quantityAdministered: req.body.quantityAdministered,
    vaccineID: req.body.vaccineID,
    centreName: req.body.centreName
  });

  // Save Batch in the database
  batch.create(batch, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Batch.",
      });
    else res.send(data);
  });
}

// Retrieve all Batches from the database.
export const findAll = (req, res) => {
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
export const findOne = (req, res) => {
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

export const update = (req, res) => {
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
