import { Request, Response } from 'express';

class Sale {
    store(req: Request, res: Response) {
        res.send(req.body);
    }
}

export const sale = new Sale();
