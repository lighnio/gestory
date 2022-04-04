export const salesHelper = (results: string[]) => {
    const [sales, profitsSum, countSales, averageSum, PromedioMaxM, PromedioMinM] = JSON.parse(
        JSON.stringify(results)
    );
    console.log(`PromedioMax: ${PromedioMaxM}`);
    
    const [avgSum] = averageSum;
    const [profits] = profitsSum;
    const [total] = countSales;
    const { COUNT: count } = total;

    return { sales, profits, count, avgSum };
};
