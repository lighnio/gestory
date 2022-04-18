"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saleForTicket = void 0;
const saleForTicket = (sale) => {
    const { dateSale, products: productsArray, saleTotal, } = JSON.parse(JSON.stringify(sale));
    const products = JSON.parse(productsArray);
    const date = new Date(dateSale).toLocaleDateString('en-US');
    const total = parseFloat(saleTotal);
    return {
        products,
        date,
        total,
    };
};
exports.saleForTicket = saleForTicket;
