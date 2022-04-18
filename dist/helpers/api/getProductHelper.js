"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processProductHelper = void 0;
// This helper process the product and converts the img to a base64 img
const processProductHelper = (product) => {
    const { id, productCategory, productImage, productName, productPrice, serialNumber, productDescription, } = product;
    const data = {
        id,
        productCategory,
        productName,
        productPrice,
        serialNumber,
        productImage: Buffer.from(productImage).toString('base64'),
        productDescription,
    };
    return data;
};
exports.processProductHelper = processProductHelper;
