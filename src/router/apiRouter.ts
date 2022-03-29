import { Router } from 'express';
import { product } from '../controllers/api/product.controller';
import {
    apiMainPage,
    getProductsByCategory,
    getProductsByGender,
    noValidUrl,
    productInformation,
    searchData,
} from '../controllers/apiController';

const apiRouter = Router();

apiRouter
    .get('/', apiMainPage)
    .get('/product/:productId', product.index)
    .get('/category/:category', getProductsByCategory)
    .get('/gender/:gender', getProductsByGender)
    .get('/search', searchData)
    .get('*', noValidUrl);

module.exports = apiRouter;
