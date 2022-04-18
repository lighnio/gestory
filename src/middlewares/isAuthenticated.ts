import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.session.loggedIn) return next();

    res.redirect('/login');
};
