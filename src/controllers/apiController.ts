import { connection } from "../database/db"
import { Request, Response } from "express"
import { ResponseFormat } from '../types/apiType';

// To return any information folow the next structure: 
// If it have a error
// {
//     err: true,
//     msg : err.code
// }


// This returns the last 10 added products to the sale
export const apiMainPage = (req: Request, res: Response) => {
    const query = 'SELECT BIN_TO_UUID(idProduct) AS productId, productName, productPrice FROM products LIMIT 10;'
    connection.query(query, (err, results) => {
        if(err){

            let response : ResponseFormat = {
                err : true,
                msg: err.code
            }

            res.send(response);

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

        let response : ResponseFormat = {
            err : true,
            msg : 'No id was provided'
        }
        res.send(response);

    }else{
        const query = `SELECT productName, productPrice, productCategory FROM products WHERE BIN_TO_UUID(idProduct) = '${productId}';`
        connection.query(query, (err, results) => {
            console.log(err)
            if(err){
                let response : ResponseFormat = {
                    err : true,
                    msg : err.code
                }
                res.send(response);
            }else{

                let response : ResponseFormat = {
                    err : false,
                    data: results
                }
                res.send(response);
            }
        })

    }

}


// This controller get all the products by category

export const getProductsByCategory = (req : Request, res : Response) => {
    

    // Getting the category 
    const { category } = req.params;

    if(!category){

        let response : ResponseFormat = {
            err : true,
            msg : 'No category was specified'
        }
        res.send(response)

    }else {

        let fields = 'BIN_TO_UUID(idProduct) AS idProductd, serialNumber, productPrice, productCategory, productImage';
        let query = `SELECT ${fields} FROM products WHERE productCategory = '${category}'`;

        connection.query(query, ( err, results ) => {

            if(err){

                let response : ResponseFormat = {
                    err : true,
                    msg : err.code
                }

                res.send(response)
            }else {

                let response : ResponseFormat = {
                    err : false,
                    data : results
                }

                res.send(response)
            }

        })
    }

}


// Search by query

export const searchData = (req : Request, res : Response) => {
    if(req.query.search){

        const { search } = req.query
        
        let fields = 'BIN_TO_UUID(idProduct) AS idProduct, productName, productCategory, productPrice';
        let whereParams = `productName LIKE '%${search}%' OR productCategory LIKE '%${search}%' OR serialNumber LIKE '%${search}%'`;
        let query = `SELECT ${fields} FROM products WHERE ${whereParams};` ;

        connection.query(query, (err, results) => {
            if(err) {

                let response : ResponseFormat = {
                    err : true,
                    msg : err.code
                }
                res.send(response)
            }else {

                let response : ResponseFormat = {
                    err: false,
                    data : results
                }

                res.send(response)
            }


        })

    }else {

        let response : ResponseFormat = {
            err : true,
            msg : 'No query was specified'
        }

        res.send(response)

    }
}

// If there is a not valid route
export const noValidUrl = (req : Request, res: Response) => {

    let response : ResponseFormat = {
        err : true,
        msg: 'Not valid url'
    }

    res.send(response)
}