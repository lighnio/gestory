interface productType {
    id: string;
}
export const createSaleQuery = (products: Array<productType>) => {
    const fields = 'productName, productPrice, purchasePrice';
    let query = `SELECT ${fields} FROM products where`;

    products.map((product: productType, index: number) => {
        const { id } = product;
        query += `${index != 0 ? ' OR' : ''} BIN_TO_UUID(idProduct) = '${id}'`;
    });

    query += ' ORDER BY productName;';

    return query;
};
