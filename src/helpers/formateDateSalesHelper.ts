interface salesType {
    idSale: string;
    saleProfit: number;
    dateSale: string;
    costumerId: string;
    ticket: string;
}

export const formateDateSalesHelper = (sales: Array<salesType>) => {
    return sales.map((sale: salesType) => {
        const {
            idSale,
            saleProfit,
            dateSale: date,
            costumerId,
            ticket: ticketBuffer,
        } = sale;
        const dateSale = new Date(date).toLocaleString('en-US');

        const ticket = Buffer.from(ticketBuffer).toString('base64');
        console.log(ticket);
        return {
            idSale,
            saleProfit,
            dateSale,
            costumerId,
            ticket,
        };
    });
};
