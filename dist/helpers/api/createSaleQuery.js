"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleQuery = void 0;
const createSaleQuery = (products) => {
    const fields = 'productName, productPrice, purchasePrice';
    let query = `SELECT ${fields} FROM products where`;
    products.map((product, index) => {
        const { id } = product;
        query += `${index != 0 ? ' OR' : ''} BIN_TO_UUID(idProduct) = '${id}'`;
    });
    query += ' ORDER BY productName;';
    return query;
};
exports.createSaleQuery = createSaleQuery;
