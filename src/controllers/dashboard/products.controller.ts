import { Request, Response } from 'express';
import { connection } from '../../database/db';
import { productByIdHelper } from '../../helpers/products/getProductByIdHellper';
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
        console.log('Sí funciona');
        const { rol } = data;
        const { id } = req.params;
        const fields: string =
            'BIN_TO_UUID(idProduct) AS idProduct, productName, productDescription, serialNumber, productPrice, productCategory, purchasePrice, productImage';
        const query: string = `SELECT ${fields} FROM products WHERE BIN_TO_UUID(idProduct) = '${id}';`;

        connection.query(query, (err, results) => {
            if (err) throw err;

            let formatedData = JSON.parse(JSON.stringify(results));
            const data = productByIdHelper(formatedData);

            // const imgProcessed = Buffer.from(img).toString('base64');
            console.log('Antes de renderizar');
            res.render('viewProduct', {
                rol,
                data,
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
export const saveProduct = async (req: Request, res: Response) => {
    const {
        name: productName,
        price: productPrice,
        category: productCategory,
        purchase: purchasePrice,
        description: productDescription,
        gender: productGender,
    } = req.body;

    // @ts-ignore
    const productImageType = req.file?.mimetype;
    // @ts-ignore
    const productImageName = req.file?.originalname;

    const productImage = fs.readFileSync(
        // @ts-ignore
        join(__dirname, '../../images/' + req.file?.filename)
    );

    const path = join(__dirname, '../../images');

    var deleteFolderRecursive = function (path: any) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function (file) {
                ``;
                var curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    // recurse
                    deleteFolderRecursive(curPath);
                } else {
                    // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };

    const query: string = `INSERT INTO products SET ?`;

    await connection.query(query, {
        productName,
        productDescription,
        productPrice,
        productCategory,
        productImage,
        purchasePrice,
        productImageType,
        productImageName,
        productGender,
    }, (err, resp) => {console.log(err)});

    deleteFolderRecursive(path);
    res.redirect('/products');
};

export const deleteProductById = (req: Request, res: Response) => {
    const { id } = req.params;

    let query = `DELETE FROM products WHERE BIN_TO_UUID(idProduct) = "${id}";`;

    connection.query(query, (err) => {
        if (err) throw err;
        res.redirect('/products');
    });
};
