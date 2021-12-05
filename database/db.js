const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'marlyn2010',
    database: 'login'
});

connection.connect(err => {
    if(err){
        console.log(`Connection error: ${err}`)
        return;
    }
    return 'Connection succesfully'
});

module.exports = connection;

