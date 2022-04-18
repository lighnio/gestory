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
exports.authApi = void 0;
const db_1 = require("../../database/db");
const Costumer_1 = require("../../models/Costumer");
const Login_1 = require("../../models/Login");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../jwt/config");
const nodeMailer_1 = require("../../node-mailer/nodeMailer");
const genRegisterMailHelper_1 = require("../../helpers/api/genRegisterMailHelper");
class Auth {
    index(req, res) {
        const { mail, password } = req.body;
        const query = `SELECT BIN_TO_UUID(costumerId) as costumerId, costumerMail, costumerUsername, costumerPassword FROM costumers WHERE costumerMail = '${mail}';`;
        db_1.connection.query(query, (err, costumer) => __awaiter(this, void 0, void 0, function* () {
            if (err)
                res.json('An error has ocurred');
            if (!err) {
                //@ts-ignore
                if (costumer.length > 0) {
                    const login = new Login_1.Login();
                    //@ts-ignore
                    const { costumerPassword } = costumer[0];
                    let comp = yield login.compare(password, costumerPassword);
                    if (comp) {
                        //@ts-ignore
                        const { costumerId, costumerUsername } = costumer[0];
                        const token = jsonwebtoken_1.default.sign({
                            id: costumerId,
                        }, config_1.config.secret, {
                            expiresIn: 60 * 60 * 24,
                        });
                        const user = {
                            user: costumerUsername,
                            id: costumerId,
                        };
                        res.status(200).json({
                            auth: true,
                            token,
                            user,
                        });
                    }
                    if (!comp)
                        res.json({
                            err: true,
                            msg: 'Password did not match',
                        });
                }
                //@ts-ignore
                if (costumer.length <= 0) {
                    res.json({
                        err: true,
                        msg: 'No user found',
                    });
                }
            }
        }));
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, user, password, email, zip, adress, country } = req.body;
            const costumer = new Costumer_1.Costumer(name, user, password, email, zip, adress, country);
            yield costumer.encript(password);
            const query = 'INSERT INTO costumers SET ?';
            db_1.connection.query(query, costumer, (err, result) => {
                if (err) {
                    res.send({
                        err: true,
                        msg: err.message,
                    });
                }
                else {
                    const mailOptions = {
                        from: 'bryantello2010@hotmail.com',
                        to: costumer.costumerMail,
                        subject: 'Thanks for dressing you',
                        html: (0, genRegisterMailHelper_1.genRegisterMailHelper)(costumer.costumerName),
                    };
                    nodeMailer_1.transporter.sendMail(mailOptions, (err) => {
                        if (err)
                            return console.log(err);
                    });
                    res.status(200).send({
                        err: false,
                    });
                }
            });
        });
    }
    destroy(req, res) {
        res.status(200).send({
            auth: false,
            token: null,
        });
    }
}
exports.authApi = new Auth();
