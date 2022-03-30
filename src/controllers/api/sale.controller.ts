import { Request, Response } from 'express';

class Sale {
    store(req: Request, res: Response) {
        res.send(req.body);
    }

    show(req: Request, res: Response) {
        res.send('Ticket');
    }
}

export const sale = new Sale();
