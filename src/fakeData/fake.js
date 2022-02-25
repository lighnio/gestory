"use strict";
exports.__esModule = true;
var minifaker_1 = require("minifaker");
var db_1 = require("../database/db");
require('minifaker/locales/en');
var data = [];
var fill = function (amount) {
    if (amount <= 0) {
        return;
    }
    else {
        var dataGen = {
            firstName: "".concat((0, minifaker_1.name)(), " ").concat((0, minifaker_1.lastName)()),
            user: (0, minifaker_1.username)(),
            pass: (0, minifaker_1.password)(),
            mail: (0, minifaker_1.email)(),
            rol: amount % 2 == 0 ? 'admin' : 'data entry'
        };
        // console.log('data: ', dataGen)
        fill(amount - 1);
    }
    data.push(dataGen);
};
var quantity = parseInt(process.argv[2]);
fill(quantity);
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
