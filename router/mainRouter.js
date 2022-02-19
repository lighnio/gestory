import { Router } from 'express';
import {loginView, registerView, logOut, accountView, registerPost, auth } from '../controllers/accountController'
import  { indexView, products, manageUsers, manageCostumers, searchUser, salesById, getUser } from '../controllers/dashboardController';
import { apiRouter } from './apiRouter';
const { notFound } = require('../controllers/mainController');


const router = Router();
// Routing
router
    // Dashboard
    .get('/', indexView)
    .get('/api/', apiRouter)
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