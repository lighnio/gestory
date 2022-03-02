import { Router } from 'express';
import {
    indexView,
    manageCostumers,
    salesById,
} from '../controllers/dashboardController';
import { products, downloadTicket } from '../controllers/dashboard/products';
import {
    getUser,
    manageUsers,
    searchUser,
} from '../controllers/dashboard/users';
const dashboardRouter = Router();

dashboardRouter
    .get('/', indexView)
    .get('/products', products)
    .get('/users', manageUsers)
    .post('/users', searchUser)
    .get('/user/:userId', getUser)
    .get('/costumers', manageCostumers)
    .get('/sale/:saleId', salesById)
    .get('/ticket/:saleId', downloadTicket);

module.exports = dashboardRouter;
