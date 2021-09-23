module.exports = app => {
    const patients = require("../controllers/patient.controller.js");
  
    // Create a new Patient
    app.post("/patients", patients.create);
  
    // Retrieve all Patients
    app.get("/patients", patients.findAll);
  
    // Retrieve a single Patient with username
    app.get("/patients/:patientUsername", patients.findOne);

    // Retrieve a single Patient with the correct combination username and password
    app.post("/patients/verifyPatient", patients.verifyPatient);

};