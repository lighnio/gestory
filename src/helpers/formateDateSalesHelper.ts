interface salesType {
    idSale: string;
    saleProfit: number;
    dateSale: string;
    costumerId: string;
}

export const formateDateSalesHelper = (sales: Array<salesType>) => {
    return sales.map((sale: salesType) => {
        const { idSale, saleProfit, dateSale: date, costumerId } = sale;
        const dateSale = new Date(date).toLocaleString('en-US');

        return {
            idSale,
            saleProfit,
            dateSale,
            costumerId,
        };
    });
};
