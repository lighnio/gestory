import { productType } from '../../types/apiType';
// This helper process the product and converts the img to a base64 img
export const processProductHelper = (product: productType) => {
    const { id } = product;

    return { id };
};
