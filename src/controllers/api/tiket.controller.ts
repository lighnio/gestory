import { Request, Response } from 'express';

class Tiket {
    show(req: Request, res: Response) {
        res.send('Tiket');
    }
}

export const tiket = new Tiket();
