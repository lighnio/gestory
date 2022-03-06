import { productType } from '../../types/apiType';
// This helper process the product and converts the img to a base64 img
export const processProductHelper = (product: productType) => {
    const {
        id,
        productCategory,
        productImage,
        productName,
        productPrice,
        serialNumber,
        purchasePrice,
    } = product;

    const data: productType = {
        id,
        productCategory,
        productName,
        productPrice,
        serialNumber,
        purchasePrice,
        productImage: Buffer.from(productImage).toString('base64'),
    };

    return data;
};
