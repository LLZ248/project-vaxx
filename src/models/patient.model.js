const sql = require("./db.js");

const Patient = function(patient) {
    this.username = patient.username;
    this.password = patient.password;
    this.email = patient.email;
    this.fullName = patient.fullName;
    this.ICPassport = patient.ICPassport;
};

Patient.create = (newPatient, result) => {
    sql.query("INSERT INTO patient SET ?", newPatient, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created patient: ", { id: res.insertId, ...newPatient });
      result(null, { id: res.insertId, ...newPatient });
    });
};

Patient.findById = (patientUsername, result) => {
    sql.query(`SELECT * FROM patient WHERE username = ${patientUsername}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found patient: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Patient with the username
      result({ kind: "not_found" }, null);
    });
};

Patient.getAll = result => {
    sql.query("SELECT * FROM patient", (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
    }

    console.log("patients: ", res);
    result(null, res);
    });
};

Patient.verifyPatient = (username, password, result) => {

    var hash = crypto.createHash('sha256');
    data = hash.update(password);
    newPassword= data.digest('hex');
    newPasswordTxt = (""+newPassword).toUpperCase();

    connection.query('SELECT * FROM patient WHERE username = \''+username+'\' AND password = \''+newPasswordTxt+'\'', (err, rows) =>{
      if(err){
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("Valid Patient : ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found Patient with the username nad password combination
      result({ kind: "not_found" }, null);			
    });


    sql.query(`SELECT * FROM patient WHERE username = ${patientUsername}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found patient: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found Patient with the username
      result({ kind: "not_found" }, null);
    });
};

module.exports = Patient;