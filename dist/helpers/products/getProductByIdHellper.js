"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productByIdHelper = void 0;
const productByIdHelper = (data) => {
    const { idProduct, productName, productDescription, serialNumber, productPrice, productCategory, purchasePrice, productImage, } = data[0];
    const imgToBase64 = Buffer.from(productImage).toString('base64');
    const response = {
        idProduct,
        productName,
        productCategory,
        productDescription,
        serialNumber,
        productPrice,
        purchasePrice,
        productImage: imgToBase64,
    };
    return response;
};
exports.productByIdHelper = productByIdHelper;
