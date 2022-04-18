"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesByIdHelper = void 0;
const salesByIdHelper = (results) => {
    let [data] = JSON.parse(JSON.stringify(results));
    return data;
};
exports.salesByIdHelper = salesByIdHelper;
