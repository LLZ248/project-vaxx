var Vaccination =  require("../models/vaccination.model.js");

// Create and Save a new Vaccination
exports.create=(req, res) =>{
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Vaccination
  const vaccination = new Vaccination({
    vaccinationID: req.body.vaccinationID,
    appointmentDate: req.body.appointmentDate,
    status: req.body.status,
    username: req.body.username, //patient username
    batchNo: req.body.batchNo,
  });

  // Save Vaccination in the database
  vaccination.create(vaccination, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vaccination.",
      });
    else res.send(data);
  });
}

// Retrieve all Vaccination from the database.
exports.findAll = (req, res) => {
  Vaccination.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Vaccination.",
      });
    else res.send(data);
  });
}

// Retrieve one Vaccination from the database based on vaccinationID.
exports.findOne = (req, res) => {
  Vaccination.findById(req.params.vaccinationID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vaccination with vaccinationID ${req.params.vaccinationID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Vaccination with vaccinationID " +
            req.params.vaccinationID,
        });
      }
    } else res.send(data);
  });
}

// update Vaccination from the database based on vaccinationID.
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Vaccination.updateById(
    req.params.vaccinationID,
    new Vaccination(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Vaccination with vaccinationID ${req.params.vaccinationID}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Vaccination with vaccinationID " +
              req.params.vaccinationID,
          });
        }
      } else res.send(data);
    }
  );
};
