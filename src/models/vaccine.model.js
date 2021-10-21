const sql = require("../database.js");

// constructor
const Vaccine = function(vaccine) {
  this.vaccineID = vaccine.vaccineID;
  this.vaccineName = vaccine.vaccineName;
  this.manufacturer = vaccine.manufacturer;
};

Vaccine.findById = (vaccineID, result) => {
    sql.query(`SELECT * FROM vaccine WHERE vaccineID = \'${vaccineID}\'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found vaccine: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Vaccine with the id
      result({ kind: "not_found" }, null);
    });
  };
  
Vaccine.getAll = result => {
  sql.query("SELECT * FROM vaccine", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vaccines: ", res);
    result(null, res);
  });
}

Vaccine.getAvailable = result => {
  sql.query(
    `SELECT vaccine.vaccineName, vaccine.manufacturer FROM batch 
    INNER JOIN vaccine 
    ON batch.vaccineID=vaccine.vaccineID
    GROUP BY batch.vaccineID;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("vaccines: ", res);
    result(null, res);
  });
}

module.exports = Vaccine
    