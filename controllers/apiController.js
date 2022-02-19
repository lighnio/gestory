import { connection } from "../database/db"

export const apiMainPage = (req, res) => {
    const query = 'SELECT BIN_TO_UUID(idProduct) AS id, productName, productPrice FROM products;'
    connection.query(query, (err, results) => {
        if(err){
            res.send('An erro has ocurred');
            throw err;
        }
        res.send(results)
    })
}

