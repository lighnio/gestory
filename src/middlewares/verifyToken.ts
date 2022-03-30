import config from '../jwt/config';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    next();
};
