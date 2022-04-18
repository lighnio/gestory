import { Request, Response } from 'express';
import { connection } from '../../database/db';
import { transporter } from '../../node-mailer/nodeMailer';
const bcryptjs: any = require('bcryptjs/dist/bcrypt');

class Password {
    edit(req: Request, res: Response) {
        const { mail } = req.body;
        console.log(req.body);

        const fields = 'BIN_TO_UUID(costumerId) as costumerId';
        const query = `SELECT ${fields} FROM costumers WHERE costumerMail = "${mail}"`;
        connection.query(query, (err, results) => {
            if (err)
                return res.status(500).send({
                    err: true,
                    msg: err.message,
                    query,
                });

            transporter.sendMail({
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

    patch(req: Request, res: Response) {
        res.send('Password cambiado');
    }
}

export const password = new Password();
