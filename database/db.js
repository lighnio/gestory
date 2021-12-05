const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect(err => {
    if(err){
        console.log(`Connection error: ${err}`)
        return;
    }
    return 'Connection succesfully'
});

module.exports = connection;

