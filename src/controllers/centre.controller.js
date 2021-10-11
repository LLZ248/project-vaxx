const HealthcareCentre = require('../models/centre.model.js');

// Create and Save a new Healthcare Centre
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  // Create a Healthcare Centre
  const centre = new HealthcareCentre({
    centreName: req.body.centreName,
    address: req.body.address,
  });
  
  // Save Healthcare Centre in the database
  HealthcareCentre.create(centre, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Healthcare Centre."
      });
    else res.send(data);
  });
};

// Retrieve all Healthcare Centres from the database.
exports.findAll = (req, res) => {
  HealthcareCentre.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Healthcare Centres."
            });
        else res.send(data);
    });
};

// Find a single Healthcare Centre with the username
exports.findOne = (req, res) => {
  HealthcareCentre.findByCenterName(req.query.centreName, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Healthcare Centre with username ${req.query.centreName}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Healthcare Centre with username " + req.query.centreName
          });
        }
      } else res.send(data);
    });
};
