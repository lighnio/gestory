const {name, lastName, password, username, email } = require('minifaker');
const dotenv = require('dotenv');
require('minifaker/locales/en'); 

//Dotenv Configure
dotenv.config({
    path: './env/.env'
})

const connection = require('../database/db.js');
const Connection = require('mysql/lib/Connection');

let data = []
const fill = (amount) => {
    if(amount <= 0){
        return;
    }else{
        var dataGen = {
            firstName: `${name()} ${lastName()}`,
            user: username(),
            pass: password(),
            mail: email(),
            rol: amount % 2 == 0 ? 'admin': 'data entry'
        }
        // console.log('data: ', dataGen)
        fill(amount - 1);
        
    }
    data.push(dataGen);
}
fill(process.argv[2]);
// console.log(data);

for(let i in data){
    connection.query('INSERT INTO users SET ?', {
        name: data[i].firstName, 
        user: data[i].user,
        pass: data[i].pass, 
        mail: data[i].mail,
        rol: data[i].rol
    });
}