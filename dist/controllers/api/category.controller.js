"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category = void 0;
const db_1 = require("../../database/db");
const getProductHelper_1 = require("../../helpers/api/getProductHelper");
class Category {
    index(req, res) {
        // Getting the category
        const { category } = req.params;
        if (!category) {
            let response = {
                err: true,
                msg: 'No category was specified',
            };
            res.send(response);
        }
        else {
            let fields = 'BIN_TO_UUID(idProduct) AS idProductd, productName, productPrice, productCategory, productImage';
            let query = `SELECT ${fields} FROM products WHERE productCategory = '${category}'`;
            db_1.connection.query(query, (err, results) => {
                if (err) {
                    let response = {
                        err: true,
                        msg: err.code,
                    };
                    res.send(response);
                }
                else {
                    let formatedResults = [];
                    //@ts-ignore
                    results.map((product) => {
                        formatedResults = [
                            ...formatedResults,
                            (0, getProductHelper_1.processProductHelper)(product),
                        ];
                    });
                    let response = {
                        err: false,
                        data: formatedResults,
                    };
                    res.send(response);
                }
            });
        }
    }
}
exports.category = new Category();
