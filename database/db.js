const mysql = require('mysql');

var data = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST
};

data = {
    user: 'ripterdust',
    password: 'marlyn2010',
    database: 'login',
    host: 'localhost'
}

const connection = mysql.createConnection(data);

connection.connect(err => {
    if(err){
        console.log(`Connection error: ${err}`)
        return;
    }
    return 'Connection succesfully'
});

module.exports = connection;

