interface dataStructure {
    idProduct: string;
    productName: string;
    productDescription: string;
    serialNumber: string;
    productPrice: number;
    productCategory: string;
    purchasePrice: number;
    productImage: Array<string | Array<object>>;
}

export const productByIdHelper = (data: Array<dataStructure>) => {
    const {
        idProduct,
        productName,
        productDescription,
        serialNumber,
        productPrice,
        productCategory,
        purchasePrice,
        productImage,
    } = data[0];
};
