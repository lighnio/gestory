import { connection } from "../database/db"
import { Request, Response } from "express"


// To return any information folow the next structure: 
// If it have a error
// {
//     err: true,
//     msg : err
// }


// This returns the last 10 added products to the sale

export const apiMainPage = (req: Request, res: Response) => {
    const query = 'SELECT BIN_TO_UUID(idProduct) AS productId, productName, productPrice FROM products LIMIT 10;'
    connection.query(query, (err, results) => {
        if(err){
            res.send('An erro has ocurred');
            throw err;
        }
        res.send({
            err: false,
            data : results
        })
    })
}


// This get a single product n' returns it
export const productInformation = (req: Request, res: Response) => {
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
                    data : results
                })
            }
        })

    }

}


// This controller get all the products by category

export const getProductsByCategory = (req : Request, res : Response) => {
    

    // Getting the category 
    const { category } = req.params;

    if(!category){
        res.send({
            err: true
        })
    }else {

        let fields = 'BIN_TO_UUID(idProduct) AS idProductd, serialNumber, productPrice, productCategory, productImage';
        let query = `SELECT ${fields} FROM products WHERE productCategory = '${category}'`;

        connection.query(query, ( err, results ) => {

            if(err){
                res.send({
                    err: true,
                    msg : err
                })
            }else {
                res.send({
                    err: false,
                    data : results
                })
            }

        })
    }

}