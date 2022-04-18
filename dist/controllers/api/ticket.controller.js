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
exports.tiket = void 0;
const db_1 = require("../../database/db");
const saleForTicket_helper_1 = require("../../helpers/api/saleForTicket.helper");
class Tiket {
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const fields = 'dateSale, products, saleTotal';
            const query = `SELECT ${fields} FROM sales WHERE BIN_TO_UUID(idSale) = '${id}';`;
            db_1.connection.query(query, (err, results) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return res.json({
                        err: true,
                        msg: err.message,
                    });
                // @ts-ignore
                const { products, date, total } = (0, saleForTicket_helper_1.saleForTicket)(results[0]);
                res.json({
                    err: false,
                    products,
                    date,
                    total,
                });
            }));
        });
    }
}
exports.tiket = new Tiket();
