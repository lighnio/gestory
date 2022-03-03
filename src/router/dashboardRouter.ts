import { Router } from 'express';
import {
    indexView,
    salesById,
    downloadTicket,
    dateSales,
} from '../controllers/dashboard/sales.controller';
import { products } from '../controllers/dashboard/products.controller';
import {
    getUser,
    manageUsers,
    searchUser,
} from '../controllers/dashboard/users.controller';
import { manageCostumers } from '../controllers/dashboard/costumers.controller';

const dashboardRouter = Router();

dashboardRouter
    //sales
    .get('/', indexView)
    .get('/sale/:saleId', salesById)
    .get('/ticket/:saleId', downloadTicket)
    // Products
    .post('/', dateSales)
    .get('/products', products)
    // Users
    .get('/users', manageUsers)
    .post('/users', searchUser)
    .get('/user/:userId', getUser)
    // Costumers
    .get('/costumers', manageCostumers);

module.exports = dashboardRouter;
