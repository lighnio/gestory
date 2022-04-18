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
exports.manageCostumers = void 0;
const db_1 = require("../../database/db");
const manageCostumersHelper_1 = require("../../helpers/manageCostumersHelper");
const getQueryHelper_1 = require("../../helpers/costumers/getQueryHelper");
// This is a route to manage the costumers
const manageCostumers = (req, res) => {
    // @ts-ignore
    const { rol } = req.session.data;
    if (rol == 'admin') {
        let query = (0, getQueryHelper_1.getQueryForCostumersHelper)();
        db_1.connection.query(query, [1, 2], (err, results) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            let { costumers, total } = (0, manageCostumersHelper_1.formatData)(results);
            res.render('manageCostumers', {
                rol,
                costumers,
                total,
            });
        }));
    }
    else {
        res.redirect('/');
    }
};
exports.manageCostumers = manageCostumers;
