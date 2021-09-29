const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');//require to read POST data
const patientRoute = require('./routes/patient.routes.js');
const vaccineRoute = require('./routes/vaccine.routes.js');
const vaccinationRoute = require('./routes/vaccination.routes.js');
const batchRoute = require('./routes/batch.routes.js');
const centreRoute = require('./routes/centre.routes.js');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));//require to read POST data
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(flash());

app.use(patientRoute)
app.use(vaccineRoute)
app.use(vaccinationRoute)
app.use(batchRoute)
app.use(centreRoute)

//changing global wise json formating
app.set('json spaces', 2) //pretty print json when requested

app.set('json replacer', function (key, value) { //DO NOT use arrow function here because 'this' keyword is used
	if (this[key] instanceof Date) {
		value = this[key].toLocaleDateString(); //changing date format
	}

return value;
});



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