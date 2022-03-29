import { Request, Response } from 'express';

class Products {
    index(req: Request, res: Response) {}
}

export const products = new Products();
