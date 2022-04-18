"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueryForCostumersHelper = void 0;
const getQueryForCostumersHelper = () => {
    let selectedFields = `BIN_TO_UUID(costumerId) AS costumerId, costumerUsername, costumerMail, costumerName, costumerZipCode, costumerCountry, costumerAdress`;
    let allCostumers = `SELECT ${selectedFields} FROM costumers;`;
    let avgCostumers = 'SELECT COUNT(*) AS total FROM costumers;';
    return `${allCostumers}${avgCostumers}`;
};
exports.getQueryForCostumersHelper = getQueryForCostumersHelper;
