var Administrator = require('../models/administrator.model.js');

// Create and Save a new Administrator
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Save Administrator in the database
  Administrator.create(req.body.username, req.body.password, req.body.fullName,req.body.email,req.body.staffID, req.body.centreName, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Administrator."
      });
    else {
      if(data.message ==="duplicate username"){
        res.send(data);
      }else{
        req.flash("register","success");
        res.redirect('/auth/login');
      }};
  });
};

// Retrieve all Administrator from the database.
exports.findAll = (req, res) => {
  Administrator.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving administrators."
            });
        else res.send(data);
    });
};

// Find a single Administrator with the username
exports.findOne = (req, res) => {
  Administrator.findById(req.query.username, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Administrator with username ${req.query.username}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Administrator with username " + req.query.username
          });
        }
      } else res.send(data);
    });
};

// Find a single Administrator with the combination of password and username
exports.verifyAdministrator = (req, res) => {
  Administrator.verifyAdmin(req.body.username, req.body.password, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Wrong username/password`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Administrator with username " + req.params.username
          });
        }
      } else {
        session = req.session;
        session.username = req.body.username;
        session.role = "administrator";

        res.send(data);
      };
    });
};

