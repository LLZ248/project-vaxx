const sql = require("../database.js");

const Administrator = ()=> {};

Administrator.create = (username, password, fullName, email, staffID, centreName, result) => {
    var crypto = require('crypto')
    var hash = crypto.createHash('sha256');
    data = hash.update(password);
    password= data.digest('hex');
    password = (""+password).toUpperCase()

    sql.query("INSERT INTO administrator (`username`, `password`, `fullName`, `email`, `staffID`,`centreName`) VALUES (?,?,?,?,?,?)",
    [username, password, fullName, email, staffID, centreName], (err, res) => {
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
  
      console.log("created administrator: ",username);
      result(null, { message: "success" });
    });
};

Administrator.findById = (username, result) => {
    sql.query(`SELECT * FROM administrator WHERE username = \'${username}\'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found administrator: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found administrator with the username
      result({ kind: "not_found" }, null);
    });
};

Administrator.getAll = result => {
    sql.query("SELECT * FROM administrator", (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
    }

    console.log("administrator: ", res);
    result(null, res);
    });
};

Administrator.verifyAdmin = (username, password, result) => {
    var crypto = require('crypto')
    var hash = crypto.createHash('sha256');
    data = hash.update(password);
    newPassword= data.digest('hex');
    newPasswordTxt = (""+newPassword).toUpperCase();

    sql.query('SELECT * FROM administrator WHERE username = \''+username+'\' AND password = \''+newPasswordTxt+'\'', (err, res) =>{
      if(err){
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("Valid administrator : ", {"username":res[0].username, "full_name":res[0].fullName});
        result(null, {"username":res[0].username, "full_name":res[0].fullName});
        return;
      }
      // not found administrator with the username nad password combination
      result({ kind: "not_found" }, null);			
    });
};

module.exports = Administrator;