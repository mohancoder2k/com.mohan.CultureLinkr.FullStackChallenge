const mysql = require('mysql2');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'tododb',
});

db.connect((err) => {
    if (err) {  console.error('Error connecting to MySQL:', err);
        throw err; } console.log('MySQL Connected...');});

    module.exports = db;
