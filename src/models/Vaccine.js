import sql from "../database.js";

// constructor
const Vaccine = function(vaccine) {
  this.vaccineID = vaccine.vaccineID;
  this.vaccineName = vaccine.vaccineName;
  this.manufacturer = vaccine.manufacturer;
};

Vaccine.findById = (vaccineID, result) => {
    sql.query(`SELECT * FROM vaccines WHERE id = ${vaccineID}`, (err, res) => {
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
    sql.query("SELECT * FROM vaccines", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("vaccines: ", res);
      result(null, res);
    });

}

export default Vaccine
    