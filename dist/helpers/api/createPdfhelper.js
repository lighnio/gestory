"use strict";
// Imports
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPDFHelper = void 0;
const createPDFHelper = (idProduct, quantity) => {
    let getProduct = `SELECT * FROM products WHERE idProduct = ${idProduct}`;
    //procesar venta
    // Obtener idProduct, Nombre, purchasePrice, 
    //crear pdf
};
exports.createPDFHelper = createPDFHelper;
