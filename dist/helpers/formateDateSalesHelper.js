"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formateDateSalesHelper = void 0;
const formateDateSalesHelper = (sales) => {
    return sales.map((sale) => {
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
exports.formateDateSalesHelper = formateDateSalesHelper;
