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
        productDescription,
    } = product;

    const data: productType = {
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
