export const salesHelper = (results: string[]) => {
    const [sales, profitsSum, countSales, avgSum] = JSON.parse(
        JSON.stringify(results)
    );

    const [profits] = profitsSum;
    const [total] = countSales;
    const { COUNT: count } = total;

    return { sales, profits, count, avgSum };
};
