export const getQuery = (date: any, page: any) => {
    const datequery: string = date
        ? `WHERE dateSale BETWEEN '${date}-01-01' AND '${date}-12-31'`
        : `WHERE dateSale BETWEEN '${new Date().getFullYear().toString()}-01-01' AND '${new Date().getFullYear().toString()}-12-31'`;

    date? '' : date = new Date().getFullYear().toString()

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
    const queryAvg: string = `SELECT ROUND(AVG(saleProfit), 2) AS avgSum FROM sales`;

    const queryAvgYear: string = `SELECT ROUND(AVG(saleProfit),2) AS YearAvg , YEAR(dateSale) AS 'Year' FROM sales WHERE dateSale BETWEEN '${date}-01-01 00:00:00.000' AND '${date}-12-31 23:59:59.000' GROUP BY YEAR(dateSale) ORDER BY YearAvg`
    const queryAvgMaxMonth: string = `SELECT ROUND(AVG(saleProfit),2) AS MaxMAvg , MONTH(dateSale) AS 'Month' FROM sales WHERE dateSale BETWEEN '${date}-01-01 00:00:00.000' AND '${date}-12-31 23:59:59.000' GROUP BY MONTH(dateSale) ORDER BY MaxMAvg DESC LIMIT 1`
    const queryAvgMinMonth: string = `SELECT ROUND(AVG(saleProfit),2) AS MinMAvg , MONTH(dateSale) AS 'Month' FROM sales WHERE dateSale BETWEEN '${date}-01-01 00:00:00.000' AND '${date}-12-31 23:59:59.000' GROUP BY MONTH(dateSale) ORDER BY MinMAvg ASC LIMIT 1`

    // console.table(queryAvg);
    // Full querys
    return `${queryAll};${queryProfits};${querySum};${queryAvg};${queryAvgYear};${queryAvgMaxMonth};${queryAvgMinMonth};`;
};
