import { connection } from "../database/db"

export const apiMainPage = (req, res) => {
    connection.query('SELECT * FROM products;', (err, results) => {
        if(err){
            res.send('An erro has ocurred');
            throw err;
        }
        res.send(results)
    })
}