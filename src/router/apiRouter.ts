import { Router } from 'express';
import { auth } from '../controllers/accountController';
import { category } from '../controllers/api/category.controller';
import { authApi } from '../controllers/api/costumer.controller';
import { gender } from '../controllers/api/gender.controller';
import { product } from '../controllers/api/product.controller';
import { products } from '../controllers/api/products.controller';
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
    // Products information
    .get('/', products.index)
    .get('/product/:productId', product.index)
    .get('/category/:category', category.index)
    .get('/gender/:gender', gender.index)
    .get('/search', searchData)

    // Costumer
    .post('/signin', authApi.index)
    .post('/signUp', authApi.store)
    .post('/logout', authApi.destroy)
    // Processing the 404
    .get('*', noValidUrl);

module.exports = apiRouter;
