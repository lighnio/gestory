"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.product = void 0;
const db_1 = require("../../database/db");
const getProductHelper_1 = require("../../helpers/api/getProductHelper");
class Product {
    index(req, res) {
        const { productId } = req.params;
        if (!productId) {
            let response = {
                err: true,
                msg: 'No id was provided',
            };
            res.send(response);
        }
        else {
            const fields = 'BIN_TO_UUID(idProduct) AS id, productName, productDescription, productPrice, serialNumber, productCategory, productImage';
            const query = `SELECT ${fields} FROM products WHERE BIN_TO_UUID(idProduct) = '${productId}';`;
            db_1.connection.query(query, (err, results) => {
                console.log(err);
                if (err) {
                    let response = {
                        err: true,
                        msg: err.code,
                    };
                    res.send(response);
                }
                else {
                    let toArray = JSON.parse(JSON.stringify(results));
                    let orderedData = {};
                    toArray.map((element) => {
                        orderedData = (0, getProductHelper_1.processProductHelper)(element);
                    });
                    // console.log("orderedData: ", orderedData);
                    let response = {
                        err: false,
                        data: orderedData,
                    };
                    res.json(response);
                }
            });
        }
    }
}
exports.product = new Product();
