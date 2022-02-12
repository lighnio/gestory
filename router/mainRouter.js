const router = require('express').Router();
const {loginView, registerView, logOut, accountView, registerPost, auth} = require('./../controllers/accountController');
const { indexView, sales, products, manageUsers, manageCostumers, searchUser } = require('../controllers/dashboardController');
const { notFound } = require('../controllers/mainController');

// Routing
router
    // Dashboard
    .get('/', indexView)
    .get('/sales', sales)
    .get('/products', products)
    .get('/users', manageUsers)
    .post('/users', searchUser)
    .get('/costumers', manageCostumers)
    // Login and authentication
    .get('/login', loginView)
    .get('/register', registerView)
    .get('/logout', logOut)
    .get('/account', accountView)
    .post('/register', registerPost)
    .post('/auth', auth)
    .get('*', notFound);
    
    module.exports = router;