import { Router } from 'express';
import { apiMainPage, getProductsByCategory, productInformation } from '../controllers/apiController';


const apiRouter = Router();

apiRouter
    .get('/', apiMainPage)
    .get('/product/:productId', productInformation)
    .get('/category/:category', getProductsByCategory)


module.exports = apiRouter;