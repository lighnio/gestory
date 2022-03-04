import { Request, Response } from 'express';
import { connection } from '../../database/db';
import fs from 'fs';
import { join } from 'path';
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

// This controller gets a single product

export const getProductById = (req: Request, res: Response) => {
    const { loggedIn, data } = req.session;

    if (loggedIn && data) {
        const { rol } = data;
        const { id } = req.params;
        const fields: string =
            'BIN_TO_UUID(idProduct) AS idProduct, productName, productDescription, serialNumber, productPrice, productCategory, purchasePrice, productImage';
        const query: string = `SELECT ${fields} FROM products WHERE BIN_TO_UUID(idProduct) = '${id}';`;

        connection.query(query, (err, results) => {
            if (err) throw err;

            const data = JSON.parse(JSON.stringify(results));

            const img = data[0].productImage;
            const imgProcessed = Buffer.from(img).toString('base64');
            res.render('viewProduct', {
                rol,
                data: imgProcessed,
            });
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
            connection.query(
                `SELECT category FROM categories`,
                (err, results) => {
                    if (err) throw err;

                    interface responseFormatType {
                        rol: string;
                        categories: Array<object>;
                    }
                    let categories = JSON.parse(JSON.stringify(results));
                    const responseFormat: responseFormatType = {
                        rol,
                        categories,
                    };

                    res.render('newProduct', responseFormat);
                }
            );
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
};

// This controller save the image on the db
export const saveProduct = (req: Request, res: Response) => {
    const {
        name: productName,
        price: productPrice,
        category: productCategory,
        purchase: purchasePrice,
        description: productDescription,
    } = req.body;

    const productImageType = req.file?.mimetype;
    const productImageName = req.file?.originalname;

    const productImage = fs.readFileSync(
        join(__dirname, '../../images/' + req.file?.filename)
    );

    const query: string = `INSERT INTO products SET ?`;

    connection.query(query, {
        productName,
        productDescription,
        productPrice,
        productCategory,
        productImage,
        purchasePrice,
        productImageType,
        productImageName,
    });

    res.redirect('/products');
};
