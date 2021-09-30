var express = require('express');
var router = express.Router();

const administrators = require("../controllers/administrator.controller.js");

// Create a new Administrator
router.post("/administrators", administrators.create);

// Retrieve all Administrators
router.get("/administrators", administrators.findAll);

// Retrieve a single Administrator with username
router.get("/administrators/findAdministrator", administrators.findOne);

// Retrieve a single Administrator with the correct combination username and password
router.post("/administrators/verifyAdministrator", administrators.verifyAdministrator);

module.exports = router;