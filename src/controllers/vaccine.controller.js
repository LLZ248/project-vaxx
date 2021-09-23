import Vaccine from "../models/vaccine.model.js";

// // Create and Save a new Vaccine
// export function create(req, res) {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//   }

//   // Create a Vaccine
//   const vaccine = new Vaccine({
//     vaccineID: req.body.vaccineID,
//     vaccineName: req.body.vaccineName,
//     manufacturer: req.body.manufacturer
//   });

//   // Save Vaccine in the database
//   vaccine.create(vaccine, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Vaccine.",
//       });
//     else res.send(data);
//   });
// }

// Retrieve all Vaccine from the database.
export const findAll = (req, res) => {
  Vaccine.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Vaccine.",
      });
    else res.send(data);
  });
}

// Retrieve one Vaccine from the database based on vaccineID.
export const findOne = (req, res) => {
  Vaccine.findById(req.params.vaccineID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Vaccine with vaccineID ${req.params.vaccineID}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving Vaccine with vaccineID " +
            req.params.vaccineID,
        });
      }
    } else res.send(data);
  });
}