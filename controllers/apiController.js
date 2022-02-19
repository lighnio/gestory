import { connection } from "../database/db"

export const apiMainPage = (req, res) => {
    const query = 'SELECT BIN_TO_UUID(idProduct) AS id, productName, productPrice FROM products;'
    connection.query(query, (err, results) => {
        if(err){
            res.send('An erro has ocurred');
            throw err;
        }
        res.send({
            err: false,
            results
        })
    })
}

export const productInformation = (req, res) => {
    const { productId } = req.params;

    if(!productId){
        res.send({
            err: true
        })
    }else{
        const query = `SELECT productName, productPrice, productCategory FROM products WHERE BIN_TO_UUID(idProduct) = "${productId}"`
        connection.query(query, (err, results) => {
            if(err){
                res.send({
                    err: true,
                    msg: err
                })
            }else{
                res.send({
                    err: false,
                    results
                })
            }
        })

    }

}