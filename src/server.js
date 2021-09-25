const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const patientRoute = require('./routes/patient.routes.js');
const vaccineRoute = require('./routes/vaccine.routes.js');
const vaccinationRoute = require('./routes/vaccination.routes.js');
const batchRoute = require('./routes/batch.routes.js');
const app = express();
const PORT = 5000;

app.set('json spaces', 2) //pretty print json when requested

app.use(express.json());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(patientRoute)
app.use(vaccineRoute)
app.use(vaccinationRoute)
app.use(batchRoute)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));