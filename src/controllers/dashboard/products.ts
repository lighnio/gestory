import { Request, Response } from 'express';
import { connection } from '../../database/db';

// This returns all the products
export const products = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        const fields: string =
            'BIN_TO_UUID( idProduct ) AS idProduct, productName, serialNumber, productPrice, productCategory';
        const query: string = `SELECT ${fields} from products`;

        connection.query(query, async (err, results) => {
            if (err) throw err;

            // @ts-ignore
            const { rol } = req.session.data;

            const data = {
                rol,
                products: results,
                total: results.length,
            };

            res.render('products', data);
        });
    } else {
        res.redirect('/');
    }
};

// This function returns the ticket by sale id
export const downloadTicket = (req: Request, res: Response) => {
    if (req.session.loggedIn) {
        const { saleId } = req.params;
        res.send(saleId);
    } else {
        res.redirect('/');
    }
};
