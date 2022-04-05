import { Request, Response } from 'express';
import fs, { closeSync } from 'fs';
import { join } from 'path';
// @ts-ignore
import PDF from 'pdfkit-table';
import { connection } from '../../database/db';
import { createSaleQuery } from '../../helpers/api/createSaleQuery';

interface productType {
    productName: string;
    productPrice: number;
    purchasePrice: number;
}
class Sales {
    async store(req: Request, res: Response) {
        const { products, name } = req.body;
        const query = createSaleQuery(products);

        connection.query(query, async (err, results) => {
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

            const doc = new PDF({
                margin: '30',
                size: 'A4',
            });

            doc.text(Date.now());
            if (!fs.existsSync('./src/tickets')) fs.mkdirSync('./src/tickets');

            await doc.pipe(fs.createWriteStream(`./src/tickets/${name}.pdf`));

            doc.end();

            const dir = join(__dirname, `../../tickets/${name}.pdf`);
            // FIXME the save
            fs.readFile(dir, (err, ticket) => {
                if (err) throw err;

                const data = {
                    products: JSON.stringify(products),
                    saleTotal: total,
                    saleProfit: profit,
                    ticket,
                };
                const query = 'INSERT INTO sales SET ?';
                connection.query(query, data, (err) => {
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
        });
    }
}

export const sale = new Sales();
