"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateSales = exports.downloadTicket = exports.salesById = exports.indexView = void 0;
// ---------Imports-------------
// Helpers
const saleById_1 = require("../../helpers/saleById");
const salesHelper_1 = require("../../helpers/salesHelper");
const getDateHelper_1 = require("../../helpers/getDateHelper");
const getSalesQuery_1 = require("../../helpers/getSalesQuery");
// Db
const db_1 = require("../../database/db");
// THis is the main view and it returns all the sales
const indexView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const { name, rol, user } = req.session.data;
    const { date, page } = req.query;
    const currencyPrefix = 'Q';
    // let match = (originalUrl.match(/\d+$/) - 1) * 10;
    // let match = (originalUrl.match(/\d+$/));
    const query = (0, getSalesQuery_1.getQuery)(date, page);
    db_1.connection.query(query, [1, 2, 3, 4, 5, 6, 7], (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        const { sales, profits: profitObj, count: total, avgSum: averageSum, percent, } = (0, salesHelper_1.salesHelper)(results);
        const pageName = 'sales';
        const { profits } = profitObj;
        const { avgSum } = averageSum;
        const auxdate = (0, getDateHelper_1.getDateHelper)(date);
        const responseData = {
            name,
            rol,
            user,
            total,
            sales,
            profits,
            avgSum,
            auxdate,
            currencyPrefix,
            pageName,
            percent,
        };
        res.render('index', responseData);
    }));
});
exports.indexView = indexView;
// This return the sale by id
const salesById = (req, res) => {
    const { saleId } = req.params;
    const query = `SELECT * FROM sales WHERE idSale = '${saleId}';`;
    db_1.connection.query(query, (err, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
        const sale = (0, saleById_1.salesByIdHelper)(results);
        res.send(sale);
    }));
};
exports.salesById = salesById;
// This function returns the ticket by sale id
const downloadTicket = (req, res) => {
    const { saleId } = req.params;
    res.send(saleId);
};
exports.downloadTicket = downloadTicket;
// This return the order by date
const dateSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date } = req.body;
    res.redirect(`/?date=${date}`);
});
exports.dateSales = dateSales;
// export const page = async (req: Request, res: Response) => {
//     const { page } = req.body;
// };
