const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const crypto = require('crypto');
const app = express();
const PORT = 5000;

const mysql = require('mysql');
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'project_vaxx'
});

app.set('json spaces', 2) //pretty print json when requested

var tokens = [
  {"token":"fasdf","role":"admin","expireDatetime":"2021-9-29 : 15-05-50"}
]


app.use(express.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

connection.connect(err => console.log(err ? err : '**connected to db**'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  connection.query(req.query.sqlQuery, (err, rows) => err ? err : res.json(rows))
})

app.get('/vaccines', function(req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  connection.query("select * FROM vaccine", function(err, rows) {
        res.json(rows);
  });
});

app.get('/healthcare-centres', function(req, res) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  connection.query("select * FROM healthcarecentre", function(err, rows){
    res.json(rows);
  });

});


app.post('/verifyPatient', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
    var hash = crypto.createHash('sha256');
    data = hash.update(password);
    newPassword= data.digest('hex');
    newPasswordTxt = (""+newPassword).toUpperCase();

    connection.query('SELECT * FROM patient WHERE username = \''+username+'\' AND password = \''+newPasswordTxt+'\'', function(err, rows) {
      if (rows === undefined) {
        response.send("UserName: "+username+"Wrong Password :"+newPasswordTxt);
      } else {
        request.session.loggedin = true;
        request.session.username = username;
        response.send('correct!');
      }			
      response.end();
    });

	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

require("./app/routes/patient.routes.js")(app);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));