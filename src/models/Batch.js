import sql from "../database.js";

// constructor
const Batch = (batch) => {
    this.batchNo = batch.batchNo;
    this.expiryDate = batch.batchNo;
    this.quantityAvailble = batch.quantityAvailble;
    this.quantityAdministered = batch.quantityAdministered;
    this.vaccineID = batch.vaccineID;
    this.centreName = batch.centreName;
};

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
    sql.query(`SELECT * FROM customers WHERE id = ${batchNo}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Batch.getAll = result => {
  query("SELECT * FROM Batch", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Batch: ", res);
    result(null, res);
  });
};

Customer.updateById = (batchNo, batch, result) => {
  query(
    "UPDATE batch SET expiryDate = ?, quantityAvailble = ?, quantityAdministered = ? WHERE batchNo = ?",
    [batch.expiryDate, batch.quantityAvailble, batch.quantityAdministered, batch.batchNo],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { batchNo: batchNo, ...batch });
      result(null, { batchNo: batchNo, ...batch });
    }
  );
};

Customer.removeById = (batchNo, result) => {
  query("DELETE FROM batch WHERE batchNo = ?", batchNo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted batch with batchNo: ", batchNo);
    result(null, res);
  });
};

export default Batch;

// class Batch {
//     //accept a normal js object
//     constructor(batch) {
//         this.batchNo = batch.batchNo;
//         this.expiryDate = batch.batchNo;
//         this.quantityAvailble = batch.quantityAvailble;
//         this.quantityAdministered = batch.quantityAdministered;
//         this.vaccineID = batch.vaccineID;
//         this.centreName = batch.centreName;
//     }

//     // getPendingVaccination;
// }

// export default Batch;