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
import { isAuthenticated } from '../middlewares/isAuthenticated';

const dashboardRouter = Router();

dashboardRouter
    //sales
    .get('/', isAuthenticated, indexView)
    .get('/sales', isAuthenticated, indexView)
    .get('/sales/:date/:page', isAuthenticated, indexView)
    .get('/sale/:saleId', isAuthenticated, salesById)
    .get('/ticket/:id', isAuthenticated, ticket.index)
    // Products
    .post('/', isAuthenticated, dateSales)
    .get('/products', isAuthenticated, products)
    .get('/newProduct', isAuthenticated, createProduct)
    .post('/newProduct', isAuthenticated, fileUpload, saveProduct)
    .get('/product/:id', isAuthenticated, getProductById)
    .get('/product/delete/:id', isAuthenticated, deleteProductById)
    // Users
    .get('/users', isAuthenticated, manageUsers)
    .post('/users', isAuthenticated, searchUser)
    .get('/users/:userId', isAuthenticated, getUser)
    // Costumers
    .get('/costumers', isAuthenticated, manageCostumers);

module.exports = dashboardRouter;
