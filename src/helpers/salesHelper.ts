export const salesHelper = (results: string[]) => {
    const [
        sales,
        profitsSum,
        countSales,
        averageSum,
        PromedioMaxM,
        PromedioMinM,
    ] = JSON.parse(JSON.stringify(results));

    const [firstMax] = PromedioMaxM;
    const [firstMin] = PromedioMinM;
    const [avgSum] = averageSum;
    const [profits] = profitsSum;
    const [total] = countSales;
    const { COUNT: count } = total;

    return { sales, profits, count, avgSum, firstMax, firstMin};
};
