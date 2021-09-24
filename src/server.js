const express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var patientRoute = require('./routes/patient.routes.js');
var vaccineRoute = require('./routes/vaccine.routes.js');
var vaccinationRoute = require('./routes/vaccination.routes.js');
var batchRoute = require('./routes/batch.routes.js');
const { Session } = require('express-session');

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

//Verify the session token stored in client browser and determine the username and role
app.get("/verify", (req, res)=>{
	session = req.session;
	if(session.username && session.role==="admin"){
		res.send({
			message: `success`,
			username: session.username,
			role: "admin"
		});
		res.send(session.username + " is admin")
    }else{
		if(session.username && session.role==="patient"){
			res.send({
				message: `success`,
				username: session.username,
				role: "patient"
			});
		}else{
			res.status(404).send({
				message: `Not Logged In`
			});
		}
	}
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));