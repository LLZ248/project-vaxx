var Patient = require('../models/patient.model.js');

// Create and Save a new Patient
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Patient in the database
  Patient.create(req.body.username, req.body.password, req.body.fullName,req.body.email,req.body.ICPassport, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Patient."
      });
    else {req.flash("register","success");res.redirect('/index')};
  });
};

// Retrieve all Patients from the database.
exports.findAll = (req, res) => {
    Patient.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving patients."
            });
        else res.send(data);
    });
};

// Find a single Patient with the username
exports.findOne = (req, res) => {
    Patient.findById(req.query.username, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Patient with username ${req.query.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Patient with username " + req.query.username
          });
        }
      } else res.send(data);
    });
};

// Find a single Patient with the combination of password and username
exports.verifyPatient = (req, res) => {
    Patient.verifyPatient(req.body.username, req.body.password, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Wrong username/password`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Patient with username " + req.params.username
          });
        }
      } else {
        session = req.session;
        session.username = req.body.username;
        session.role = "patient";

        res.send(data);
      };
    });
};

