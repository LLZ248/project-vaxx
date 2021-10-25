const sql = require("../database.js");

// constructor
class Vaccination {
  constructor(vaccination){
    this.vaccinationID = vaccination.vaccinationID;
    this.appointmentDate = vaccination.appointmentDate;
    this.remarks = vaccination.remarks;
    this.status = vaccination.status;
    this.username = vaccination.username; //patient username
    this.batchNo = vaccination.batchNo;
  }
};

Vaccination.create = (newVaccination, result) => {
  sql.query("INSERT INTO vaccination SET ?", newVaccination, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created vaccination: ", { vaccinationID: res.insertId, ...newVaccination });
    result(null, { vaccinationID: res.insertId, ...newVaccination });
  });
};

Vaccination.findById = (vaccinationId, result) => {
  sql.query(`SELECT * FROM vaccination WHERE vaccinationID = \'${vaccinationId}\'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found vaccination: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Vaccination with the vaccinationID
    result({ kind: "not_found" }, null);
  });
};

Vaccination.getAll = result => {
  sql.query("SELECT * FROM vaccination", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vaccination: ", res);
    result(null, res);
  });
};

Vaccination.findByBatch = (batchNo, result) => {
  sql.query("SELECT * FROM vaccination WHERE batchNo = ?", [batchNo], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vaccinations: ", res);
    result(null, res);
  });
};

Vaccination.updateById = (vaccinationID, vaccination, result) => {
  sql.query(
    "UPDATE vaccination SET status = ?, remarks = ? WHERE vaccinationID = ?",
    [vaccination.status, vaccination.remarks, vaccinationID],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Vaccination with the vaccinationID
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated vaccination: ", { vaccinationID: vaccinationID, ...vaccination });
      result(null, { vaccinationID: vaccinationID, ...vaccination });
    }
  );
};


// Vaccination.remove = (vaccinationID, result) => {
//   sql.query("DELETE FROM vaccination WHERE vaccinationID = ?", vaccinationID, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Vaccination with the vaccinationID
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted vaccination with vaccinationID: ", vaccinationID);
//     result(null, res);
//   });
// };

module.exports = Vaccination;