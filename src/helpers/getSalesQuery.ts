export const getQuery = (date: any, page: any) => {
    const datequery: string = date
        ? `WHERE dateSale BETWEEN '${date}-01-01' AND '${date}-12-31'`
        : '';

    const pagequery: string = page ? 
        `LIMIT ${((page - 1) * 10)}, 10`  
        : 'LIMIT 0, 10'

    const allFields = 'BIN_TO_UUID(idSale) AS idSale, saleProfit, dateSale, BIN_TO_UUID(costumerId) AS costumerId';

    const queryAll: string = `SELECT ${allFields}  FROM sales ${datequery} ORDER BY dateSale DESC ${pagequery}`;
    // Sumatory query
    const querySum: string = `SELECT COUNT(*) AS COUNT FROM sales ${datequery}`;

    // Profits query
    const queryProfits: string = `SELECT ROUND(SUM(saleProfit), 2) as profits FROM sales ${datequery}`;

    // Avg sale query
    const queryAvg: string = `SELECT ROUND(AVG(saleProfit), 2) AS avgSum FROM sales;`;

    // console.table(queryAvg);
    // Full querys
    return `${queryAll};${queryProfits};${querySum};${queryAvg}`;
};
