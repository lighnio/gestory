import { Request, Response } from 'express';

export const notFound = (req: Request, res: Response) => {
    res.redirect('/');
};
