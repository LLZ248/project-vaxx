const Patient = require("../models/patient.model.js");

// Create and Save a new Patient
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Patient
  const patient = new Patient({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    fullName: req.body.fullName,
    ICPassport : req.body.ICPassport
  });

  // Save Patient in the database
  Patient.create(patient, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
    Patient.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Patient with the username
exports.findOne = (req, res) => {
    Patient.findById(req.params.username, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with username ${req.params.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with username " + req.params.username
          });
        }
      } else res.send(data);
    });
};

// Find a single Patient with a username
exports.verifyPatient = (req, res) => {
    Patient.findById(req.params.username, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Customer with username ${req.params.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Customer with username " + req.params.username
          });
        }
      } else res.send(data);
    });
};

