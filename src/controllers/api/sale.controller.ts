import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import { connection } from '../../database/db';

interface productType {
    id: string;
}

class Sales {
    store(req: Request, res: Response) {
        const { products } = req.body;

        const fields = 'productName, productPrice, purchasePrice';
        let query = `SELECT ${fields} FROM products where`;

        products.map((product: productType, index: number) => {
            const { id } = product;
            query += `${
                index != 0 ? ' OR' : ''
            } BIN_TO_UUID(idProduct) = '${id}'`;
        });

        res.status(200).send(query);
    }
}

export const sale = new Sales();
