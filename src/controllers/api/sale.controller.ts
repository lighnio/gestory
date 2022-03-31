import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { connection } from '../../database/db';
import { createSaleQuery } from '../../helpers/api/createSaleQuery';

class Sales {
    store(req: Request, res: Response) {
        const { products } = req.body;
        const query = createSaleQuery(products);
        res.status(200).send(query);
    }
}

export const sale = new Sales();
