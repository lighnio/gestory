export const salesHelper = (results: string[]) => {
    const [sales, profitsSum, countSales, averageSum] = JSON.parse(
        JSON.stringify(results)
    );

    const [profitObj] = profitsSum;
    const { profits } = profitObj;
    const [total] = countSales;
    const { COUNT: count } = total;

    return { sales, profits, count, averageSum };
};
