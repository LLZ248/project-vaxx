// app.js
const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = 3307;

// First you need to create a connection to the db


// connection.connect((err) => {
//   if(err){
//     console.log(err);
//     return;
//   }
//   console.log('Connection established');
// });

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port:'3306',
    database: 'project_vaxx'
  });

  
console.log('connecting to db')

connection.connect((err) => {
    console.log(err ? err : '*connected*\n');
})

app.get('/vaccines', (req, res) => {
    connection.query('SELECT * FROM Vaccine;', (err, vaccines) => {
        if (err) console.log(err);
        res.send(vaccines);
    })
});

app.get('/test', (req, res) => {
    res.send('working');
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
