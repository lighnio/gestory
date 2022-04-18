"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesHelper = void 0;
const formateDateSalesHelper_1 = require("./formateDateSalesHelper");
const salesHelper = (results) => {
    const [salesUnformated, profitsSum, countSales, averageSum, YearAvg, PromedioMaxM, PromedioMinM,] = JSON.parse(JSON.stringify(results));
    const [firstMax] = PromedioMaxM;
    const [firstMin] = PromedioMinM;
    const [avgYear] = YearAvg;
    let percent = 0;
    if (firstMax && firstMin && avgYear) {
        const subMax = (firstMax.MaxMAvg - firstMin.MinMAvg) / 100;
        percent = Math.ceil(avgYear.YearAvg / subMax);
    }
    percent === Infinity ? (percent = 0) : '';
    const [avgSum] = averageSum;
    const [profits] = profitsSum;
    const [total] = countSales;
    const { COUNT: count } = total;
    const sales = (0, formateDateSalesHelper_1.formateDateSalesHelper)(salesUnformated);
    return { sales, profits, count, avgSum, firstMax, firstMin, percent };
};
exports.salesHelper = salesHelper;
