const mysql = require('mysql');
const connection = mysql.createPool({
host: 'localhost',
user: 'root',
password: '',
database: 'project_vaxx'
});

module.exports = connection;