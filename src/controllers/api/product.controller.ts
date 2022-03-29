import { Request, Response } from 'express';
import { connection } from '../../database/db';
import { processProductHelper } from '../../helpers/api/getProductHelper';
import { ResponseFormat, productType } from '../../types/apiType';

class Product {
    index(req: Request, res: Response) {
        const { productId } = req.params;

        if (!productId) {
            let response: ResponseFormat = {
                err: true,
                msg: 'No id was provided',
            };
            res.send(response);
        } else {
            const fields: string =
                'BIN_TO_UUID(idProduct) AS id, productName, productDescription, productPrice, serialNumber, productCategory, productImage';
            const query = `SELECT ${fields} FROM products WHERE BIN_TO_UUID(idProduct) = '${productId}';`;
            connection.query(query, (err, results) => {
                console.log(err);
                if (err) {
                    let response: ResponseFormat = {
                        err: true,
                        msg: err.code,
                    };
                    res.send(response);
                } else {
                    let toArray = JSON.parse(JSON.stringify(results));

                    let orderedData: any = {};
                    toArray.map((element: productType) => {
                        orderedData = processProductHelper(element);
                    });
                    // console.log("orderedData: ", orderedData);
                    let response: ResponseFormat = {
                        err: false,
                        data: orderedData,
                    };
                    res.json(response);
                }
            });
        }
    }
}

export const product = new Product();
