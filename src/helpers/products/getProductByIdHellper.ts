interface dataStructure {
    idProduct: string;
    productName: string;
    productDescription: string;
    serialNumber: string;
    productPrice: number;
    productCategory: string;
    purchasePrice: number;
    productImage: any;
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
