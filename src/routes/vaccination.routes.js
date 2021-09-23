export default (app) => {
  const vaccinations = require("../controllers/vaccination.controller.js");

//   // Create a new Vaccination
//   app.post("/vaccinations", vaccinations.create);

  // Retrieve all Vaccination
  app.get("/vaccinations", vaccinations.findAll);

  // Retrieve a single Vaccination with vaccinationID
  app.get("/customers/:vaccinationID", vaccinations.findOne);
};
