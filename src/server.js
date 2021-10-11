const express = require('express');
var session = require('express-session');
var flash = require('connect-flash');
const bodyParser = require('body-parser');//require to read POST data

//Import Routes
var patientRoute = require('./routes/patient.routes.js');
var vaccineRoute = require('./routes/vaccine.routes.js');
var vaccinationRoute = require('./routes/vaccination.routes.js');
var batchRoute = require('./routes/batch.routes.js');
var centreRoute = require('./routes/centre.routes.js');
var administratorRoute = require('./routes/administrator.route.js');

const app = express();
const PORT = 5000;

//setting for extension
app.set('json spaces', 2) //pretty print json when requested
app.use(bodyParser.urlencoded({ extended: true }));//require to read POST data
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

//Use the imported Routes
app.use(patientRoute);
app.use(vaccineRoute);
app.use(vaccinationRoute);
app.use(batchRoute);
app.use(centreRoute);
app.use(administratorRoute);

//Verify the session token stored in client browser and determine the username and role
app.get("/verify", (req, res)=>{
	
	session = req.session;
	console.log(session)
	if(session.username && session.role==="administrator"){
		res.send({
			message: `success`,
			username: session.username,
			role: "admin"
		});
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