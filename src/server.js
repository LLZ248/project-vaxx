const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var patientRoute = require('./routes/patient.routes.js');
var vaccineRoute = require('./routes/vaccine.routes.js');
var vaccinationRoute = require('./routes/vaccination.routes.js');
var batchRoute = require('./routes/batch.routes.js');
const app = express();
const PORT = 5000;

app.set('json spaces', 2) //pretty print json when requested

app.use(express.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(patientRoute)
app.use(vaccineRoute)
app.use(vaccinationRoute)
app.use(batchRoute)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));