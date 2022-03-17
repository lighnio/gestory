import { Router } from 'express';
import {
    apiMainPage,
    getProductForCart,
    getProductsByCategory,
    noValidUrl,
    productInformation,
    searchData,
} from '../controllers/apiController';

const apiRouter = Router();

apiRouter
    .get('/', apiMainPage)
    .get('/product/:productId', productInformation)
    .get('/category/:category', getProductsByCategory)
    .get('/search', searchData)
    .get('/product/cart/:id', getProductForCart)
    .get('*', noValidUrl);

module.exports = apiRouter;
