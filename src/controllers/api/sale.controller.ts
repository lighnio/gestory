import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { connection } from '../../database/db';
import { createSaleQuery } from '../../helpers/api/createSaleQuery';

class Sales {
    store(req: Request, res: Response) {
        const { products } = req.body;
        const query = createSaleQuery(products);

        connection.query(query, (err, results) => {
            if (err)
                return res.status(500).send({ err: true, msg: err.sqlMessage });

            res.status(200).send({
                err: false,
                msg: results,
            });
        });
    }
}

export const sale = new Sales();
