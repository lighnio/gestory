import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { connection } from '../../database/db';
import { createSaleQuery } from '../../helpers/api/createSaleQuery';

interface productType {
    productName: string;
    productPrice: number;
    purchasePrice: number;
}
class Sales {
    store(req: Request, res: Response) {
        const { products } = req.body;
        const query = createSaleQuery(products);

        connection.query(query, (err, results) => {
            if (err)
                return res.status(500).send({ err: true, msg: err.sqlMessage });

            let products: Array<object> = [];
            let total = 0;
            let profit = 0;

            results.map((product: productType) => {
                products = [
                    ...products,
                    {
                        product: product.productName,
                        price: product.productPrice,
                    },
                ];

                total += product.productPrice;
                profit += product.purchasePrice;
            });

            const data = {
                products: JSON.stringify(products),
                saleTotal: total,
                saleProfit: profit,
            };

            const query = 'INSERT INTO sales SET ?';
            connection.query(query, data, (err, result) => {
                if (err)
                    return res.status(500).send({
                        err: true,
                        msg: err.sqlMessage,
                    });
                res.status(200).send({
                    err: false,
                    msg: 'Sale succesufully',
                });
            });
        });
    }
}

export const sale = new Sales();
