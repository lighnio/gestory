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
exports.gender = void 0;
const db_1 = require("../../database/db");
const getProductHelper_1 = require("../../helpers/api/getProductHelper");
class Gender {
    index(req, res) {
        const { gender } = req.params;
        const fields = 'BIN_TO_UUID(idproduct) AS id, productName, productPrice, productImage';
        const query = `SELECT ${fields} FROM products WHERE productGender = '${gender}' OR productGender = 'unisex';`;
        db_1.connection.query(query, (err, results) => __awaiter(this, void 0, void 0, function* () {
            if (err) {
                res.json({ err, msg: err.code });
            }
            else {
                let formatedResults = [];
                //@ts-ignore
                results.map((product) => {
                    formatedResults = [
                        ...formatedResults,
                        (0, getProductHelper_1.processProductHelper)(product),
                    ];
                });
                res.json({
                    err: false,
                    data: formatedResults,
                });
            }
        }));
    }
}
exports.gender = new Gender();
