const sql = require("../database.js");

class Batch {
  constructor(batch) {
    this.batchNo = batch.batchNo;
    this.expiryDate = batch.expiryDate;
    this.quantityAvailable = batch.quantityAvailable;
    this.quantityAdministered = batch.quantityAdministered;
    this.vaccineID = batch.vaccineID;
    this.centreName = batch.centreName;
  }
}

Batch.create = (newBatch, result) => {
  sql.query("INSERT INTO batch SET ?", newBatch, (err, res) => {
  if (err) {
    console.log("error: ", err);

    if(err.code === 'ER_DUP_ENTRY') //then overwrite with custom message
      err.message = `Batch Number "${newBatch.batchNo}" already exists.` 
      
    result(err, null);
    return;
  }

  console.log("created batch: ", { id: res.insertId, ...newBatch });
  result(null, { id: res.insertId, ...newBatch });
  });
};

Batch.findById = (batchNo, result) => {
    sql.query(`
    SELECT *, quantityAvailable - quantityOccupied AS 'quantityRemaining' FROM

    (SELECT * FROM batch WHERE batchNo = ?) AS batch,

    (SELECT COUNT(*) AS 'quantityPending' FROM vaccination WHERE batchNo = ? AND status = 'pending') AS QuantityPending,

    (SELECT COUNT(*) AS 'quantityOccupied' FROM vaccination WHERE batchNo = ? AND status IN ('pending','confirmed','administered')) AS quantityOccupied;`, 
    [batchNo, batchNo, batchNo], (err, res) => {
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

Batch.getAvailable = (centreName, vaccineID, result) => {
  sql.query(
    `SELECT 
    batch.batchNo,
    batch.expiryDate,
    batch.quantityAvailable,
    vaccineID as vaccineName,
    count(vaccination.vaccinationID) as BatchQuantity
    FROM batch
    LEFT JOIN vaccination 
    ON batch.batchNo = vaccination.batchNo 
    WHERE (vaccination.status IN ('pending','confirmed','administered') OR vaccinationID IS NULL)
    AND centreName = '${centreName}' 
    AND vaccineID = '${vaccineID}'
    AND expiryDate > CURDATE()
    GROUP BY vaccination.batchNo
    HAVING BatchQuantity < batch.quantityAvailable;`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`Available Batch of ${centreName} and: ${vaccineID} :`, res);
    result(null, res);
  });
};

// Batch.viewAll = result => {
//   sql.query("SELECT * FROM batch JOIN vaccination ON batch.batchNo = vaccination.batchNo", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("Batch: ", res);
//     result(null, res);
//   });
// };

Batch.updateById = (batchNo, batch, result) => {
  sql.query(
    "UPDATE batch SET quantityAvailable = ?, quantityAdministered = ? WHERE batchNo = ?",
    [batch.quantityAvailable, batch.quantityAdministered, batch.batchNo],
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

Batch.viewByCenter = (centreName, result) => {
  sql.query(`
  SELECT batch.batchNo, expiryDate, vaccineName, quantityAvailable, quantityAdministered, 
  COUNT(vaccinationID) AS quantityPending FROM Batch 
  JOIN Vaccine ON Batch.vaccineID = Vaccine.vaccineID 
  LEFT JOIN 
  (SELECT batchNo, vaccinationID FROM Vaccination WHERE status = 'pending') AS PendingVaccination 
  ON Batch.batchNo = PendingVaccination.batchNo 
  WHERE centreName = ?
  GROUP BY Batch.batchNo`, [centreName] , (err, res) => {
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