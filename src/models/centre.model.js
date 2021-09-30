const sql = require("../database.js");

class HealthcareCentre {
  constructor(healthcareCentre){
    this.centreName = healthcareCentre.centreName;
    this.address = healthcareCentre.address;
  }
}

HealthcareCentre.create = (newCentre, result) => {
    sql.query("INSERT INTO healthcarecentre SET ?", newCentre, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created healthcare centre: ", { id: res.insertId, ...newCentre });
      result(null, { id: res.insertId, ...newCentre });
    });
};

HealthcareCentre.findByCenterName = (centreName, result) => {
    sql.query(`SELECT * FROM healthcarecentre WHERE centreName = \'${centreName}\'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found healthcare centre: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found healthcare centre with the centreName
      result({ kind: "not_found" }, null);
    });
};

HealthcareCentre.getAll = result => {
    sql.query("SELECT * FROM healthcarecentre", (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
    }

    console.log("healthcare centres: ", res);
    result(null, res);
    });
};

module.exports = HealthcareCentre;