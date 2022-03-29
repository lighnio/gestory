import { Response, Request } from 'express';
import { connection } from '../../database/db';
import { Costumer } from '../../models/Costumer';
import { Login } from '../../models/Login';
import token from 'jsonwebtoken';

class Auth {
    index(req: Request, res: Response) {
        const { mail, password }: { mail: string; password: string } = req.body;

        const query: string = `SELECT costumerMail, costumerPassword FROM costumers WHERE costumerMail = '${mail}';`;
        connection.query(query, async (err, costumer) => {
            if (err) res.json('An error has ocurred');
            if (!err) {
                if (costumer.length > 0) {
                    const login = new Login();
                    let comp = await login.compare(
                        password,
                        costumer[0].costumerPassword
                    );

                    if (comp) res.json(costumer);

                    if (!comp)
                        res.json({
                            err: true,
                            msg: 'Password did not match',
                        });
                }
                if (costumer.length <= 0) {
                    res.json({
                        err: true,
                        msg: 'No user found',
                    });
                }
            }
        });
    }

    async store(req: Request, res: Response) {
        const { name, user, password, email, zip, adress, country } = req.body;

        const costumer = new Costumer(
            name,
            user,
            password,
            email,
            zip,
            adress,
            country
        );

        await costumer.encript(password);

        const query = 'INSERT INTO costumers SET ?';
        connection.query(query, costumer, (err, result) => {
            if (err) {
                res.send({
                    err: true,
                    msg: err.sqlMessage,
                });
            } else {
                res.send(result);
            }
        });
    }
    destroy(req: Request, res: Response) {
        res.send('Logout');
    }
}

export const authApi = new Auth();
