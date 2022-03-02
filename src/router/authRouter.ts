import { Router } from 'express';
import {
    loginView,
    registerView,
    logOut,
    accountView,
    registerPost,
    auth,
} from '../controllers/accountController';
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
const { notFound } = require('../controllers/mainController');

const router = Router();
// Routing
router
    // Dashboard
    // Login and authentication
    .get('/login', loginView)
    .get('/register', registerView)
    .get('/logout', logOut)
    .get('/account', accountView)
    .post('/register', registerPost)
    .post('/auth', auth)
    .get('*', notFound);

module.exports = router;
