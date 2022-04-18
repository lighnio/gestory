"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = require("../controllers/accountController");
const costumers_controller_1 = require("../controllers/dashboard/costumers.controller");
const products_controller_1 = require("../controllers/dashboard/products.controller");
const sales_controller_1 = require("../controllers/dashboard/sales.controller");
const users_controller_1 = require("../controllers/dashboard/users.controller");
const { notFound } = require('../controllers/mainController');
const router = (0, express_1.Router)();
// Routing
router
    // Dashboard
    .get('/', sales_controller_1.indexView)
    .get('/products', products_controller_1.products)
    .get('/users', users_controller_1.manageUsers)
    .post('/users', users_controller_1.searchUser)
    .get('/user/:userId', users_controller_1.getUser)
    .get('/costumers', costumers_controller_1.manageCostumers)
    .get('/sale/:saleId', sales_controller_1.salesById)
    // Login and authentication
    .get('/login', accountController_1.loginView)
    .get('/register', accountController_1.registerView)
    .get('/logout', accountController_1.logOut)
    .get('/account', accountController_1.accountView)
    .post('/register', accountController_1.registerPost)
    .post('/auth', accountController_1.auth)
    .get('*', notFound);
module.exports = router;
