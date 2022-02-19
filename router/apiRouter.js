import { Router } from 'express';
import { apiMainPage } from '../controllers/apiController';


const apiRouter = Router();

apiRouter
    .get('/', apiMainPage);
module.exports = apiRouter;