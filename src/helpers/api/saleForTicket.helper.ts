interface saleType {
    dateSale: string;
    products: object[];
    saleTotal: number;
}
export const saleForTicket = (sale: saleType) => {
    const { dateSale, products, saleTotal } = JSON.parse(JSON.stringify(sale));
    console.log(dateSale);
};
