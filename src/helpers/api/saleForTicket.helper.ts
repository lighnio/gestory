interface saleType {
    dateSale: string;
    products: object[];
    saleTotal: number;
}
export const saleForTicket = (sale: saleType) => {
    const res = JSON.parse(JSON.stringify(sale));
    console.log(res);
};
