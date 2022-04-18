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
exports.verifyToken = void 0;
const config_1 = require("../jwt/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['x-access-token'];
    if (!token)
        return res.status(401).send({
            auth: false,
            msg: 'No token was providen',
        });
    try {
        //@ts-ignore
        const decoded = yield jsonwebtoken_1.default.verify(token, config_1.config.secret);
        //@ts-ignore
        req.userId = decoded.id;
    }
    catch (err) {
        return res.status(401).send({
            auth: false,
            msg: 'Token expired',
        });
    }
    next();
});
exports.verifyToken = verifyToken;
