export const salesHelper = results => {

    const [sales, profitsSum, countSales] = JSON.parse(JSON.stringify(results));

    const [ profits ] = profitsSum;
    const [total] = countSales;
    const { COUNT : count } = total;

    return {sales, profits, count }
}