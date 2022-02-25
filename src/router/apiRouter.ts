import { Router } from 'express';
import { apiMainPage, getProductsByCategory, productInformation, searchData } from '../controllers/apiController';


const apiRouter = Router();

apiRouter
    .get('/', apiMainPage)
    .get('/product/:productId', productInformation)
    .get('/category/:category', getProductsByCategory)
    .get('/search', searchData)


module.exports = apiRouter;