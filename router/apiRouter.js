import { Router } from 'express';
import { index } from '../controllers/apiController';


export const apiRouter = Router();

apiRouter
    .get('/', index)