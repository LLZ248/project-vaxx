const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/vaccines', function(req, res) {
  const connection = require('./util/connection.js');
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  connection.getConnection(function(err, conn){
    conn.query("select * FROM vaccine", function(err, rows) {
         res.json(rows);
    });
  })
});

app.post('/verifyPatient', function(req, res) {
  // const connection = require('./util/connection.js');
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // connection.getConnection(function(err, conn){
  //   conn.query("select * FROM vaccine", function(err, rows) {
  //        res.json(rows);
  //   });
  // })
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));