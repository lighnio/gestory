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
exports.Costumer = void 0;
const bcryptjs = require('bcryptjs/dist/bcrypt');
class Costumer {
    constructor(name, username, password, mail, zipCode, adress, country) {
        this.costumerName = name;
        this.costumerUsername = username;
        this.costumerPassword = password;
        this.costumerMail = mail;
        this.costumerZipCode = zipCode;
        this.costumerAdress = adress;
        this.costumerCountry = country;
    }
    encript(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const encripted = yield bcryptjs.hash(password, 8);
            this.costumerPassword = encripted;
        });
    }
}
exports.Costumer = Costumer;
