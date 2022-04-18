"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTiket = void 0;
const processTiket = (tiket) => {
    const base64 = Buffer.from(tiket).toString('base64');
    return base64;
};
exports.processTiket = processTiket;
