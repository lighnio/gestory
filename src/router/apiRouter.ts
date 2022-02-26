import { Router } from 'express';
import { apiMainPage, getProductsByCategory, noValidUrl, productInformation, searchData } from '../controllers/apiController';
import { notFound } from '../controllers/mainController';


const apiRouter = Router();

apiRouter
    .get('/', apiMainPage)
    .get('/product/:productId', productInformation)
    .get('/category/:category', getProductsByCategory)
    .get('/search', searchData)
    .get('*', noValidUrl)

module.exports = apiRouter;