import { Router } from 'express';
import {
    loginView,
    registerView,
    logOut,
    accountView,
    registerPost,
    auth,
} from '../controllers/accountController';
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
