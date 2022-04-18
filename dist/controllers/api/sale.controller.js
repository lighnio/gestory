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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sale = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
// @ts-ignore
const pdfkit_construct_1 = __importDefault(require("pdfkit-construct"));
const db_1 = require("../../database/db");
const createSaleQuery_1 = require("../../helpers/api/createSaleQuery");
class Sales {
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { products, name } = req.body;
            const query = (0, createSaleQuery_1.createSaleQuery)(products);
            db_1.connection.query(query, (err, results) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return res.status(500).send({ err: true, msg: err.message });
                let products = [];
                let total = 0;
                let profit = 0;
                // @ts-ignore
                results.map((product) => {
                    products = [
                        ...products,
                        {
                            product: product.productName,
                            price: product.productPrice,
                        },
                    ];
                    total += product.productPrice;
                    profit += product.purchasePrice;
                });
                const doc = new pdfkit_construct_1.default({
                    size: 'A4',
                    margins: { top: 20, left: 10, right: 10, bottom: 20 },
                    bufferPages: true,
                });
                if (!fs_1.default.existsSync('./src/tickets'))
                    fs_1.default.mkdirSync('./src/tickets');
                // @ts-ignore
                const randomText = (Math.random() + 1).toString(36).substring(2);
                const pdfName = `dressU-ticket-${randomText}.pdf`;
                yield doc.pipe(yield fs_1.default.createWriteStream(`./src/tickets/${pdfName}`));
                const dir = (0, path_1.join)(__dirname, `../../tickets/${pdfName}`);
                doc.end();
                fs_1.default.readFile(dir, (err, ticket) => __awaiter(this, void 0, void 0, function* () {
                    yield console.log(ticket);
                }));
                const ticket = '';
                // FIXME the save
                const data = {
                    products: JSON.stringify(products),
                    saleTotal: total,
                    saleProfit: profit,
                    ticket,
                };
                const query = 'INSERT INTO sales SET ?';
                db_1.connection.query(query, data, (err) => {
                    if (err)
                        return res.status(500).send({
                            err: true,
                            msg: err.message,
                        });
                    res.status(200).send({
                        err: false,
                        msg: 'Sale succesufully',
                    });
                });
            }));
        });
    }
}
exports.sale = new Sales();
