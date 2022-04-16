import { readFileSync } from 'fs';
import mysql from 'mysql';

export const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    ssl: {
        rejectUnauthorized: true,
    },
});

connection.connect((err) => {
    if (err) {
        // console.log(`Connection error: ${err}`);
        return console.log(err);
    }
    return 'Connection succesfully';
});
