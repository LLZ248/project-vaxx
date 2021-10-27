const Vaccination = require("../models/vaccination.model.js");

// Create and Save a new Vaccination
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const randomString = Math.random().toString(36).substring(2,10).toUpperCase();
  const newVaccinationID = req.body.batchNo + "-" + randomString;

  // Create a Vaccination
  const vaccination = new Vaccination({
    vaccinationID: newVaccinationID,
    appointmentDate: req.body.appointmentDate,
    status: "pending",
    username: req.body.username, //patient username
    batchNo: req.body.batchNo,
  });

  // Save Vaccination in the database
  Vaccination.create(vaccination, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vaccination.",
      });
    else res.send(data);
  });
};

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
};

exports.findByBatch = (req, res) => {

  const batchNo = req.params.batchNo;
  if(!batchNo) {
    res.status(400).send({
      message:
        "Batch number not found in the request" //bad request
    });
    return;
  }

  Vaccination.findByBatch(batchNo, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Vaccination.",
      });
    else res.send(data);
  });
};



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
};

// update Vaccination from the database based on vaccinationID.
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  Vaccination.updateById(
    req.body.vaccinationID,
    new Vaccination(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Vaccination with vaccinationID ${req.body.vaccinationID}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating Vaccination with vaccinationID " +
              req.body.vaccinationID,
          });
        }
      } else {
        const axios = require('axios');
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        var bodyData = `vaccinationID=${req.body.vaccinationID}&status=${req.body.status}`
        if(req.body.remarks !== undefined) bodyData = bodyData + `&remarks=${req.body.remarks}`
        //console.log(bodyData)
        axios.post('http://localhost:5000/send-confirmation-email',bodyData, { headers }).then(result=>{console.log(result.data)});
        res.send(data)};
    }
  );
};
