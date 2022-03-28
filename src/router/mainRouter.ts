import { Router } from 'express';
import {
    loginView,
    registerView,
    logOut,
    accountView,
    registerPost,
    auth,
} from '../controllers/accountController';
import { manageCostumers } from '../controllers/dashboard/costumers.controller';
import { products } from '../controllers/dashboard/products.controller';
import {
    indexView,
    salesById,
} from '../controllers/dashboard/sales.controller';
import {
    getUser,
    manageUsers,
    searchUser,
} from '../controllers/dashboard/users.controller';
const { notFound } = require('../controllers/mainController');

const router = Router();
// Routing
router
    // Dashboard
    .get('/', indexView)
    .get('/products', products)
    .get('/users', manageUsers)
    .post('/users', searchUser)
    .get('/user/:userId', getUser)
    .get('/costumers', manageCostumers)
    .get('/sale/:saleId', salesById)
    // Login and authentication
    .get('/login', loginView)
    .get('/register', registerView)
    .get('/logout', logOut)
    .get('/account', accountView)
    .post('/register', registerPost)
    .post('/auth', auth)
    .get('*', notFound);

module.exports = router;
