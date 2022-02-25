import {name, lastName, password, username, email } from 'minifaker';
import { connection } from '../database/db';
require('minifaker/locales/en'); 

interface User{
    firstName : unknown,
    user : string,
    pass: string,
    mail : string,
    rol : string
}

let data : Array<User> = [];

const fill = (amount : number) => {
    if(amount <= 0){
        return;
    }else{
        var dataGen : User = {
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

let quantity : number = parseInt(process.argv[2])
fill(quantity);
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