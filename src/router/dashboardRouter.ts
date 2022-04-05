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
import { ticket } from '../controllers/dashboard/ticket';

const dashboardRouter = Router();

dashboardRouter
    //sales
    .get('/', indexView)
    .get('/sales', indexView)
    .get('/sales/:date/:page', indexView)
    .get('/sale/:saleId', salesById)
    .get('/ticket/:id', ticket.index)
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
    .get('/users/:userId', getUser)
    // Costumers
    .get('/costumers', manageCostumers);

module.exports = dashboardRouter;
