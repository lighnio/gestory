import { Router } from 'express';
import { category } from '../controllers/api/category.controller';
import { authApi } from '../controllers/api/costumer.controller';
import { gender } from '../controllers/api/gender.controller';
import { product } from '../controllers/api/product.controller';
import { products } from '../controllers/api/products.controller';
import { sale } from '../controllers/api/sale.controller';
import { tiket } from '../controllers/api/tiket.controller';
import { noValidUrl, searchData } from '../controllers/apiController';
import { verifyToken } from '../middlewares/verifyToken';

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

    // Sale
    .get('/tiket/:id', verifyToken, tiket.show)
    .post('/buy', verifyToken, sale.store)

    // Processing the 404
    .get('*', noValidUrl);

module.exports = apiRouter;
