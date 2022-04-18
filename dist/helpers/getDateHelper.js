"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateHelper = void 0;
const getDateHelper = (date) => {
    const creationDate = new Date();
    return date ? date : creationDate.getFullYear();
};
exports.getDateHelper = getDateHelper;
