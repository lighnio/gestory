export const salesHelper = (results: string[]) => {
    const [sales, profitsSum, countSales, averageSum] = JSON.parse(
        JSON.stringify(results)
    );

    const [avgSum] = averageSum;
    const [profits] = profitsSum;
    const [total] = countSales;
    const { COUNT: count } = total;

    return { sales, profits, count, avgSum };
};
