const sql = require("../database.js");

const Patient = ()=> {};

Patient.create = (username, password, fullName, email, ICPassport, result) => {
    var crypto = require('crypto')
    var hash = crypto.createHash('sha256');
    data = hash.update(password);
    password= data.digest('hex');
    password = (""+password).toUpperCase()

    sql.query("INSERT INTO patient (`username`, `password`, `email`, `fullName`, `ICPassport`) VALUES (?,?,?,?,?)", [username, password, fullName,email,ICPassport], (err, res) => {
      if (err) {
        console.log("error: ", err);
        if (err.code === "ER_DUP_ENTRY"){
          //Failed: Duplicate Username
          result(null, { message: "duplicate username" })
          return
        }else{
          //Failed when inserting into sql database
          result(err, null);
          return;
        }
      }
  
      console.log("created patient: ",username);
      result(null, { message: "success" });
    });
};

Patient.findById = (patientUsername, result) => {
    sql.query(`SELECT * FROM patient WHERE username = \'${patientUsername}\'`, (err, res) => {
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
    var crypto = require('crypto')
    var hash = crypto.createHash('sha256');
    data = hash.update(password);
    newPassword= data.digest('hex');
    newPasswordTxt = (""+newPassword).toUpperCase();

    sql.query('SELECT * FROM patient WHERE username = \''+username+'\' AND password = \''+newPasswordTxt+'\'', (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Valid Patient : ", {"username":res[0].username, "full_name":res[0].fullName});
        result(null, {"username":res[0].username, "full_name":res[0].fullName});
        return;
      }
      // not found Patient with the username nad password combination
      result({ kind: "not_found" }, null);			
    });
};

module.exports = Patient;