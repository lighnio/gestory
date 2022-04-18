"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lengthCount = void 0;
const lengthCount = (results) => {
    const [count] = JSON.parse(JSON.stringify(results));
    return count['count(*)'];
};
exports.lengthCount = lengthCount;
