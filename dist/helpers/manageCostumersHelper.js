"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatData = void 0;
const formatData = (results) => {
    let [costumers, count] = JSON.parse(JSON.stringify(results));
    let [Count] = count;
    let { total } = Count;
    return { costumers, total };
};
exports.formatData = formatData;
