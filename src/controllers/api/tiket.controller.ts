import { Request, Response } from 'express';
import { connection } from '../../database/db';

class Tiket {
    async show(req: Request, res: Response) {
        const { id } = req.params;

        res.send('Tiket');
    }
}

export const tiket = new Tiket();
