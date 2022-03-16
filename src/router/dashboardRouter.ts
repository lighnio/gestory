import { Router } from 'express';
import {
    indexView,
    salesById,
    downloadTicket,
    dateSales,
} from '../controllers/dashboard/sales.controller';
import {
    createProduct,
    deleteProductById,
    getProductById,
    products,
    saveProduct,
} from '../controllers/dashboard/products.controller';
import {
    getUser,
    manageUsers,
    searchUser,
} from '../controllers/dashboard/users.controller';
import { manageCostumers } from '../controllers/dashboard/costumers.controller';
import { fileUpload } from '../multer/multerConfig';

const dashboardRouter = Router();

dashboardRouter
    //sales
    .get('/', indexView)
    .get('/:date/:page', indexView)
    .get('/sale/:saleId', salesById)
    .get('/ticket/:saleId', downloadTicket)
    // Products
    .post('/', dateSales)
    .get('/products', products)
    .get('/newProduct', createProduct)
    .post('/newProduct', fileUpload, saveProduct)
    .get('/product/:id', getProductById)
    .get('/product/delete/:id', deleteProductById)
    // Users
    .get('/users', manageUsers)
    .post('/users', searchUser)
    .get('/user/:userId', getUser)
    // Costumers
    .get('/costumers', manageCostumers);

module.exports = dashboardRouter;
