interface saleType {
    dateSale: string;
    products: object[];
    saleTotal: number;
}
export const saleForTicket = (sale: saleType) => {
    const {
        dateSale,
        products: productsArray,
        saleTotal,
    } = JSON.parse(JSON.stringify(sale));

    const products = JSON.parse(productsArray);
    const date = new Date(dateSale).toLocaleDateString('en-US');

    const total = parseFloat(saleTotal);
    return {
        products,
        date,
        total,
    };
};
