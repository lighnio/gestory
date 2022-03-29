import { Response, Request } from 'express';
import { connection } from '../../database/db';
import { Costumer } from '../../models/Costumer';

class Auth {
    index(req: Request, res: Response) {
        res.send('Login');
    }

    store(req: Request, res: Response) {
        res.send('Register');
    }
    destroy(req: Request, res: Response) {
        res.send('Logout');
    }
}

export const authApi = new Auth();
