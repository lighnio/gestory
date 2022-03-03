import { Request, Response } from 'express';
import { connection } from '../../database/db';
import multer from 'multer';

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

// This function returns the newProduct form
export const createProduct = (req: Request, res: Response) => {
    // @ts-ignore
    const { loggedIn } = req.session;

    if (loggedIn && req.session.data) {
        // @ts-ignore
        const { rol } = req.session.data;

        if (rol == 'admin') {
            const responseFormat: object = {
                rol,
            };

            res.render('newProduct', responseFormat);
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
};

export const saveProduct = (req: Request, res: Response) => {
    const { body } = req;

    console.log(body);

    res.send(body);
};
