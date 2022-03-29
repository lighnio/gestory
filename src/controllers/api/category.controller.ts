import { Request, Response } from 'express';
import { connection } from '../../database/db';
import { ResponseFormat } from '../../types/apiType';

class Category {
    index(req: Request, res: Response) {
        // Getting the category
        const { category } = req.params;

        if (!category) {
            let response: ResponseFormat = {
                err: true,
                msg: 'No category was specified',
            };
            res.send(response);
        } else {
            let fields =
                'BIN_TO_UUID(idProduct) AS idProductd, serialNumber, productPrice, productCategory, productImage';
            let query = `SELECT ${fields} FROM products WHERE productCategory = '${category}'`;

            connection.query(query, (err, results) => {
                if (err) {
                    let response: ResponseFormat = {
                        err: true,
                        msg: err.code,
                    };

                    res.send(response);
                } else {
                    let response: ResponseFormat = {
                        err: false,
                        data: results,
                    };

                    res.send(response);
                }
            });
        }
    }
}

export const category = new Category();
