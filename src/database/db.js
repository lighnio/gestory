"use strict";
exports.__esModule = true;
exports.connection = void 0;
var mysql_1 = require("mysql");
exports.connection = mysql_1["default"].createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
});
exports.connection.connect(function (err) {
    if (err) {
        console.log("Connection error: ".concat(err));
        return;
    }
    return 'Connection succesfully';
});
