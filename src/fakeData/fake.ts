const {name, lastName, password, username, email } = require('minifaker');
import { connection } from '../database/db';
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

console.log('faker')

let data : object[] = []
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