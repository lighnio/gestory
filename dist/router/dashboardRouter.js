"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sales_controller_1 = require("../controllers/dashboard/sales.controller");
const products_controller_1 = require("../controllers/dashboard/products.controller");
const users_controller_1 = require("../controllers/dashboard/users.controller");
const costumers_controller_1 = require("../controllers/dashboard/costumers.controller");
const multerConfig_1 = require("../multer/multerConfig");
const ticket_1 = require("../controllers/dashboard/ticket");
const isAuthenticated_1 = require("../middlewares/isAuthenticated");
const dashboardRouter = (0, express_1.Router)();
dashboardRouter
    //sales
    .get('/', isAuthenticated_1.isAuthenticated, sales_controller_1.indexView)
    .get('/sales', isAuthenticated_1.isAuthenticated, sales_controller_1.indexView)
    .get('/sales/:date/:page', isAuthenticated_1.isAuthenticated, sales_controller_1.indexView)
    .get('/sale/:saleId', isAuthenticated_1.isAuthenticated, sales_controller_1.salesById)
    .get('/ticket/:id', isAuthenticated_1.isAuthenticated, ticket_1.ticket.index)
    // Products
    .post('/', isAuthenticated_1.isAuthenticated, sales_controller_1.dateSales)
    .get('/products', isAuthenticated_1.isAuthenticated, products_controller_1.products)
    .get('/newProduct', isAuthenticated_1.isAuthenticated, products_controller_1.createProduct)
    .post('/newProduct', isAuthenticated_1.isAuthenticated, multerConfig_1.fileUpload, products_controller_1.saveProduct)
    .get('/product/:id', isAuthenticated_1.isAuthenticated, products_controller_1.getProductById)
    .get('/product/delete/:id', isAuthenticated_1.isAuthenticated, products_controller_1.deleteProductById)
    // Users
    .get('/users', isAuthenticated_1.isAuthenticated, users_controller_1.manageUsers)
    .post('/users', isAuthenticated_1.isAuthenticated, users_controller_1.searchUser)
    .get('/users/:userId', isAuthenticated_1.isAuthenticated, users_controller_1.getUser)
    // Costumers
    .get('/costumers', isAuthenticated_1.isAuthenticated, costumers_controller_1.manageCostumers);
module.exports = dashboardRouter;
