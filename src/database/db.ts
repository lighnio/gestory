import mysql from 'mysql';

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    ssl: {
        rejectUnauthorized: false,
    },
});

connection.connect((err) => {
    if (err) return console.log(err.sqlMessage);
    console.log('Db is connected');
});
