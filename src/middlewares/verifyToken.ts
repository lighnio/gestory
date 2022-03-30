import { config } from '../jwt/config';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers['x-access-token'];

    if (!token)
        return res.status(401).send({
            auth: false,
            msg: 'No token was providen',
        });

    //@ts-ignore
    const decoded = await jwt.verify(token, config.secret);

    //@ts-ignore
    req.userId = decoded.id;
    next();
};
