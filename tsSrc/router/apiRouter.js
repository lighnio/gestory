import { Router } from 'express';
import { apiMainPage, productInformation } from '../controllers/apiController';


const apiRouter = Router();

apiRouter
    .get('/', apiMainPage)
    .get('/product/:productId', productInformation)


module.exports = apiRouter;