"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.password = void 0;
const db_1 = require("../../database/db");
const nodeMailer_1 = require("../../node-mailer/nodeMailer");
const bcryptjs = require('bcryptjs/dist/bcrypt');
class Password {
    edit(req, res) {
        const { mail } = req.body;
        console.log(req.body);
        const fields = 'BIN_TO_UUID(costumerId) as costumerId';
        const query = `SELECT ${fields} FROM costumers WHERE costumerMail = "${mail}"`;
        db_1.connection.query(query, (err, results) => {
            if (err)
                return res.status(500).send({
                    err: true,
                    msg: err.message,
                    query,
                });
            nodeMailer_1.transporter.sendMail({
                to: 'bryantello2010@hotmail.com',
                from: mail,
                subject: 'Reset password',
                html: `<a href="www.google.com">Reset password</a>`,
            });
            res.status(200).send({
                err: false,
            });
        });
        // const mailConfig = {
        //     from: 'Bryantello2010@hotmail.com',
        //     to:
        // };
        // transporter.sendMail(mailConfig);
        // res.send('Change password');
    }
    patch(req, res) {
        res.send('Password cambiado');
    }
}
exports.password = new Password();
