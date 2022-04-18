import { Request, Response } from 'express';
import { connection } from '../../database/db';
import { processProductHelper } from '../../helpers/api/getProductHelper';
import { ResponseFormat, productType } from '../../types/apiType';

class Products {
    index(req: Request, res: Response) {
        const fields: string =
            'BIN_TO_UUID(idProduct) AS id, productName, serialNumber, productPrice, productCategory, productImage';
        const query: string = `SELECT ${fields} FROM products ORDER BY idProduct DESC LIMIT 8`;
        connection.query(query, (err, results) => {
            if (err) {
                let response: ResponseFormat = {
                    err: true,
                    msg: err.code,
                };

                res.send(response);

                throw err;
            }

            let formatedResults: Array<object> = [];
            // @ts-ignore
            results.map((product: productType) => {
                formatedResults = [
                    ...formatedResults,
                    processProductHelper(product),
                ];
            });

            res.send({
                err: false,
                data: formatedResults,
            });
        });
    }
}

export const products = new Products();
