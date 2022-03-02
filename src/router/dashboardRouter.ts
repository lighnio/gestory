import { Router } from 'express';
import {
    indexView,
    products,
    manageUsers,
    manageCostumers,
    searchUser,
    salesById,
    getUser,
    downloadTicket,
} from '../controllers/dashboardController';

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
