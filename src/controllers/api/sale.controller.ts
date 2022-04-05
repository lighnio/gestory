import { Request, Response } from 'express';
import fs from 'fs';
import { join } from 'path';
// @ts-ignore
import PdfkitConstruct from 'pdfkit-construct';
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

            const doc = new PdfkitConstruct({
                size: 'A4',
                margins: { top: 20, left: 10, right: 10, bottom: 20 },
                bufferPages: true,
            });

            if (!fs.existsSync('./src/tickets')) fs.mkdirSync('./src/tickets');

            // @ts-ignore
            const randomText = (Math.random() + 1).toString(36).substring(2);

            const pdfName = `dressU-ticket-${randomText}.pdf`;
            await doc.pipe(
                await fs.createWriteStream(`./src/tickets/${pdfName}`)
            );
            const dir = join(__dirname, `../../tickets/${pdfName}`);
            doc.end();

            fs.readFile(dir, async (err, ticket) => {
                await console.log(ticket);
            });

            const ticket = '';

            // FIXME the save

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
    }
}

export const sale = new Sales();
