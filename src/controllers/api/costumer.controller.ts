import { Response, Request } from 'express';
import { connection } from '../../database/db';
import { Costumer } from '../../models/Costumer';

class Auth {
    index(req: Request, res: Response) {
        const { email, password }: { email: string; password: string } =
            req.body;

        const query: string = `SELECT * FROM costumers WHERE costumerMail = '${email}';`;
        connection.query(query, (err, costumer) => {
            if (err) res.send('An error has ocurred');
            if (!err) {
                if (costumer.length > 0) {
                    res.send(costumer);
                }
                if (costumer.length <= 0) res.send('No costumer found');
            }
        });
    }

    store(req: Request, res: Response) {
        res.send(req.body);
    }
    destroy(req: Request, res: Response) {
        res.send('Logout');
    }
}

export const authApi = new Auth();
