const sql = require("../database.js");

// constructor
// const Batch = (batch) => {
//     this.batchNo = batch.vaccineID + batch.batchNo;
//     this.expiryDate = batch.expiryDate;
//     this.quantityAvailable = batch.quantityAvailable;
//     this.quantityAdministered = 0;
//     this.vaccineID = batch.vaccineID;
//     this.centreName = batch.centreName;
// };

class Batch {
  constructor(batch) {
    this.batchNo = batch.vaccineID + batch.batchNo;
    this.expiryDate = batch.expiryDate;
    this.quantityAvailable = batch.quantityAvailable;
    this.quantityAdministered = 0;
    this.vaccineID = batch.vaccineID;
    this.centreName = batch.centreName;
  }
}

Batch.create = (newBatch, result) => {
  sql.query("INSERT INTO batch SET ?", newBatch, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }

  console.log("created batch: ", { id: res.insertId, ...newBatch });
  result(null, { id: res.insertId, ...newBatch });
  });
};

Batch.findById = (batchNo, result) => {
    sql.query(`SELECT * FROM batch WHERE batchNo = \'${batchNo}\'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found batch: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Batch.getAll = result => {
  sql.query("SELECT * FROM batch", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Batch: ", res);
    result(null, res);
  });
};

Batch.updateById = (batchNo, batch, result) => {
  sql.query(
    "UPDATE batch SET expiryDate = ?, quantityAvailable = ?, quantityAdministered = ? WHERE batchNo = ?",
    [batch.expiryDate, batch.quantityAvailable, batch.quantityAdministered, batch.batchNo],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Batch with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated batch: ", { batchNo: batchNo, ...batch });
      result(null, { batchNo: batchNo, ...batch });
    }
  );
};

Batch.findById = (batchNo, result) => {
  sql.query(`SELECT * FROM batch WHERE batchNo = \'${batchNo}\'`, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }

  if (res.length) {
    console.log("found batch: ", res[0]);
    result(null, res[0]);
    return;
  }

  result({ kind: "not_found" }, null);
});
};

Batch.viewByCenter = (centreName, result) => {
  sql.query(`SELECT batch.batchNo, expiryDate, vaccineName, quantityAvailable, quantityAdministered, 
  COUNT(vaccinationID) AS noOfPendingVaccination FROM Batch 
  JOIN Vaccine ON Batch.vaccineID = Vaccine.vaccineID 
  LEFT JOIN 
  (SELECT batchNo, vaccinationID FROM Vaccination WHERE status = 'pending') AS PendingVaccination 
  ON Batch.batchNo = PendingVaccination.batchNo 
  WHERE centreName = \'${centreName}\'
  GROUP BY Batch.batchNo`, (err, res) => {
    //LEFT JOIN is used because all batches must be returned 
    //even if it does not has any pending vaccination

    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length)
      result(null, res);
    else
      result({ kind: "not_found" }, null);
  });
};


module.exports = Batch;

// class Batch {
//     //accept a normal js object
//     constructor(batch) {
//         this.batchNo = batch.batchNo;
//         this.expiryDate = batch.batchNo;
//         this.quantityAvailable = batch.quantityAvailable;
//         this.quantityAdministered = batch.quantityAdministered;
//         this.vaccineID = batch.vaccineID;
//         this.centreName = batch.centreName;
//     }

//     // getPendingVaccination;
// }

// export default Batch;