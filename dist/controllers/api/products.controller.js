"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const db_1 = require("../../database/db");
const getProductHelper_1 = require("../../helpers/api/getProductHelper");
class Products {
    index(req, res) {
        const fields = 'BIN_TO_UUID(idProduct) AS id, productName, serialNumber, productPrice, productCategory, productImage';
        const query = `SELECT ${fields} FROM products ORDER BY idProduct DESC LIMIT 8`;
        db_1.connection.query(query, (err, results) => {
            if (err) {
                let response = {
                    err: true,
                    msg: err.code,
                };
                res.send(response);
                throw err;
            }
            let formatedResults = [];
            // @ts-ignore
            results.map((product) => {
                formatedResults = [
                    ...formatedResults,
                    (0, getProductHelper_1.processProductHelper)(product),
                ];
            });
            res.send({
                err: false,
                data: formatedResults,
            });
        });
    }
}
exports.products = new Products();
