export default (app) => {
    const batches = require("../controllers/batch.controller.js");
  
    // Create a new Vaccination
    app.post("/batches", batches.create);
  
    // Retrieve all Vaccination
    app.get("/batches", batches.findAll);
  
    // Retrieve a single Vaccination with batchNo
    app.get("/customers/:batchNo", batches.findOne);
  
    // Update a Vaccination with batchNo
    app.put("/customers/:batchNo", batches.update);
  };
  