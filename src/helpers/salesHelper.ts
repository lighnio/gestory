export const salesHelper = (results: string[]) => {
    const [
        sales,
        profitsSum,
        countSales,
        averageSum,
        PromedioMaxM,
        PromedioMinM,
    ] = JSON.parse(JSON.stringify(results));

    const [first, second] = PromedioMaxM;
    const [firstMin, secondMin] = PromedioMinM;

    console.log(first, second, firstMin, secondMin);

    const [avgSum] = averageSum;
    const [profits] = profitsSum;
    const [total] = countSales;
    const { COUNT: count } = total;

    return { sales, profits, count, avgSum };
};
