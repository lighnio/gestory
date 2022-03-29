import { Request, Response } from 'express';
import { connection } from '../../database/db';
import { processProductHelper } from '../../helpers/api/getProductHelper';
import { productType } from '../../types/apiType';

class Gender {
    index(req: Request, res: Response) {
        const { gender } = req.params;

        const fields =
            'BIN_TO_UUID(idproduct) AS id, productName, productPrice, productImage';
        const query = `SELECT ${fields} FROM products WHERE productGender = '${gender}' OR productGender = 'unisex';`;
        connection.query(query, async (err, results) => {
            if (err) {
                res.json({ err, msg: err.code });
            } else {
                let formatedResults: Array<object> = [];
                results.map((product: productType) => {
                    formatedResults = [
                        ...formatedResults,
                        processProductHelper(product),
                    ];
                });
                res.json({
                    err: false,
                    data: formatedResults,
                });
            }
        });
    }
}
export const gender = new Gender();
