const mysql = require('mysql');

const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'project_vaxx'
});

connection.connect(err => console.log(err ? err : '**connected to db**'));

export default connection;