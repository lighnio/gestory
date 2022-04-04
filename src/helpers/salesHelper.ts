import { formateDateSalesHelper } from './formateDateSalesHelper';

export const salesHelper = (results: string[]) => {
    const [
        salesUnformated,
        profitsSum,
        countSales,
        averageSum,
        YearAvg,
        PromedioMaxM,
        PromedioMinM
    ] = JSON.parse(JSON.stringify(results));

    const [firstMax] = PromedioMaxM;
    const [firstMin] = PromedioMinM;
    const [avgYear] = YearAvg;  

    let percent = 0;
    if(firstMax && firstMin && avgYear){
        const subMax = (firstMax.MaxMAvg - firstMin.MinMAvg) / 100
        percent = Math.ceil(avgYear.YearAvg / subMax)
    }

    const [avgSum] = averageSum;
    const [profits] = profitsSum;
    const [total] = countSales;
    const { COUNT: count } = total;

    const sales = formateDateSalesHelper(salesUnformated);
    return { sales, profits, count, avgSum,  firstMax, firstMin, percent};
};
