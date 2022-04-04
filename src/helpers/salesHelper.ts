import { formateDateSalesHelper } from './formateDateSalesHelper';

export const salesHelper = (results: string[]) => {
    const [
        salesUnformated,
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
    const sales = formateDateSalesHelper(salesUnformated);
    return { sales, profits, count, avgSum };
};
