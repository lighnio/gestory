"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const mail_config_1 = require("./mail.config");
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: mail_config_1.mailConfig.mail,
        pass: mail_config_1.mailConfig.pass,
    },
});
// Basic structure
const mailOptions = {
    from: 'bryantello2010@hotmail.com',
    to: 'bryantello2010@hotmail.com',
    subject: 'Prueba',
    text: 'COrreo enviado desde nodejs',
};
