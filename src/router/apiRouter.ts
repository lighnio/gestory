import { Router } from 'express';
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
    .get('/product/:productId', productInformation)
    .get('/category/:category', getProductsByCategory)
    .get('/gender/:gender', getProductsByGender)
    .get('/search', searchData)
    .get('*', noValidUrl);

module.exports = apiRouter;
