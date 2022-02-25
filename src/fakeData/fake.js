"use strict";
exports.__esModule = true;
var _a = require('minifaker'), name = _a.name, lastName = _a.lastName, password = _a.password, username = _a.username, email = _a.email;
var db_1 = require("../database/db");
/* Credentials Structure */
/*
    module.exports = {
    DB_HOST: '',
    DB_USER: '',
    DB_PASSWORD: '',
    DB_NAME: ''
}
*/
require('minifaker/locales/en');
console.log('faker');
var data = [];
var fill = function (amount) {
    if (amount <= 0) {
        return;
    }
    else {
        var dataGen = {
            firstName: "".concat(name(), " ").concat(lastName()),
            user: username(),
            pass: password(),
            mail: email(),
            rol: amount % 2 == 0 ? 'admin' : 'data entry'
        };
        // console.log('data: ', dataGen)
        fill(amount - 1);
    }
    data.push(dataGen);
};
fill(process.argv[2]);
// console.log(data);
for (var i in data) {
    db_1.connection.query('INSERT INTO users SET ?', {
        name: data[i].firstName,
        user: data[i].user,
        pass: data[i].pass,
        mail: data[i].mail,
        rol: data[i].rol
    });
}
